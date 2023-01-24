using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;


namespace RNAqbase.Repository
{
    public class QuadruplexRepository : RepositoryBase, IQuadruplexRepository
    {
        private readonly string searchScriptPath;

        public QuadruplexRepository(IConfiguration configuration) : base(configuration)
        {
            searchScriptPath = configuration.GetValue<string>("SearchScriptPath");
        }

        public async Task<IEnumerable<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId)
        {			
			using (var connection = Connection)
			{
                connection.Open();
                return await connection.QueryAsync<int>
                (@"
					SELECT DISTINCT(t.quadruplex_id)
					FROM tetrad t
						JOIN nucleotide n on t.nt1_id=n.id
					WHERE n.pdb_id=@PdbId
						AND t.quadruplex_id <> @QuadruplexId;",
                    new
                    {
                        QuadruplexId = quadruplexId,
                        PdbId = pdbId
                    });
            }
        }

        public async Task<Quadruplex> GetQuadruplexById(int id)
        {		
			using (var connection = Connection)
			{
                connection.Open();

                var quadruplex = await connection.QueryFirstAsync<Quadruplex>(
                    @"
						SELECT DISTINCT ON (q.id)
							q.id AS Id,
							CONCAT(q.onzm, q.subtype) AS OnzmClass,
						   	p.title as Title,
							p.identifier AS PdbIdentifier,
						    q.loop_class as LoopTopology,
							STRING_AGG(DISTINCT(qg.gba_quadruplex_class)::text,', ') AS TetradCombination,
						    to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
							n1.pdb_id AS PdbId,
							q.dot_bracket AS Dot_bracket,
							p.assembly AS AssemblyId,
							MAX(q_view.molecule) AS Molecule,
							STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
						    COUNT(DISTINCT SUBSTRING(t.onz::TEXT FROM 1 FOR 1)) AS TypeCount,
							COUNT(DISTINCT(t.id)) AS NumberOfTetrads,
							p.experiment AS Experiment,
							CASE
									WHEN max(q_view.chains) = 1 THEN 'unimolecular'
									WHEN max(q_view.chains) = 2 THEN  'bimolecular'
									ELSE 'tetramolecular'
							 END 
							 as TypeOfStrands
						FROM QUADRUPLEX q
						JOIN QUADRUPLEX_GBA qg on qg.quadruplex_id = q.id
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
						JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
						JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
						JOIN PDB p ON n1.pdb_id = p.id
						WHERE q.id = @QuadruplexId
						GROUP BY q.id, q.onzm, p.identifier, p.title, n1.pdb_id, p.assembly, n1.molecule, p.experiment;",
                    new {QuadruplexId = id});

                var ids = await connection.QueryAsync<int>(
                    @"
					SELECT t.id
					FROM QUADRUPLEX q
					JOIN TETRAD t ON q.id = t.quadruplex_id
					WHERE  q.id = @QuadruplexId",
                    new {QuadruplexId = id});

                quadruplex.Tetrads = ids.ToList();
                return quadruplex;
            }
        }

        public async Task<List<QuadruplexTable>> GetAllQuadruplexes()
        {			
			using (var connection = Connection)
			{
                connection.Open();

                return (await connection.QueryAsync<QuadruplexTable>(
					@"
						SELECT
							MAX(q.id) AS Id,
							q.loop_class as LoopTopology,
							STRING_AGG(DISTINCT(qg.gba_quadruplex_class)::text,', ') AS TetradCombination,
							CONCAT(MAX(q.onzm), MAX(q.subtype)) AS OnzmClass,
							to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
							MAX(p.identifier) AS PdbId,
							string_agg(DISTINCT(ion.name)::text, ', ') as Ion,
						    string_agg(DISTINCT(ion.charge)::text, ', ') as Ion_charge,  
							MAX(p.assembly) AS AssemblyId,
							MAX(q_view.molecule) AS Molecule,
						    MAX(p.experiment) AS Experiment,
							STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
							COUNT(DISTINCT SUBSTRING(t.onz::TEXT FROM 1 FOR 1)) AS TypeCount,
							COUNT(DISTINCT(t.id)) AS NumberOfTetrads,
							MAX(p.experiment) AS experiment,
							CASE
									WHEN max(q_view.chains) = 1 THEN 'unimolecular'
									WHEN max(q_view.chains) = 2 THEN  'bimolecular'
									ELSE 'tetramolecular'
							 END 
							 as TypeOfStrands
						FROM QUADRUPLEX q
						JOIN QUADRUPLEX_GBA qg on qg.quadruplex_id = q.id
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
						JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
						JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
						JOIN PDB p ON n1.pdb_id = p.id
						LEFT JOIN pdb_ion ON p.id = pdb_ion.pdb_id
						LEFT JOIN ion ON ion.id = pdb_ion.ion_id
						GROUP BY q.id
						HAVING COUNT(t.id) > 1")).ToList();
            }
        }

        public async Task<IEnumerable<Ions>> GetIons(int id)
        {			
			using (var connection = Connection)
			{
                connection.Open();
                return await connection.QueryAsync<Ions>(
                    @"
						SELECT 
							ion.name as Ion,
						      ion.charge as Ion_charge,
							pdb_ion.count as Count
						FROM ion
						JOIN pdb_ion on ion.id = pdb_ion.ion_id
						WHERE pdb_ion.pdb_id = @id
						", new {id = id});
            }
        }

        public async Task<List<Structure>> GetAllStructures(string query)
        {			
			using (var connection = Connection)
			{
                connection.Open();
                IEnumerable<Structure> structures = await connection.QueryAsync<Structure>(
                    @"
						SELECT
						string_agg(CAST(q.id AS TEXT), ',') as Quadruplex_id,
						p.identifier AS PdbId,
						to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
						p.assembly AS AssemblyId,
						MAX(q_view.molecule) AS Molecule,
						MAX(p.experiment) AS experiment
						FROM 
						QUADRUPLEX as q  
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN PDB p ON n1.pdb_id = p.id
						GROUP BY p.identifier, p.assembly
						order by p.identifier desc");

                if (query == null || query.Trim() == "null" || query.Trim().Length == 0)
                {
                    return structures.ToList();
                }

                Process p = new Process();
                p.StartInfo.FileName = searchScriptPath;
                p.StartInfo.Arguments = query;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardOutput = true;
                p.Start();
                string output = p.StandardOutput.ReadToEnd();
                p.WaitForExit();
                List<string> pdbIds = output.Trim().Split('\n').ToList();

                return structures
                    .Where(structure => pdbIds.Contains(structure.PdbId))
                    .OrderBy(structure =>
                        (pdbIds.IndexOf(structure.PdbId), structure.AssemblyId)
                    ).ToList();
            }
        }

        public async Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id)
        {			
			using (var connection = Connection)
			{
                connection.Open();

                return await connection.QueryAsync<Quadruplex>(
                    @"
						SELECT
							MAX(q.id) AS Id,
							CONCAT(MAX(q.onzm), MAX(q.subtype)) AS OnzmClass,
							MAX(p.identifier) AS PdbIdentifier, 
							to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
							MAX(n1.pdb_id) AS PdbId,
							MAX(p.assembly) AS AssemblyId,
							MAX(q_view.molecule) AS Molecule,
							STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
							COUNT(DISTINCT SUBSTRING(t.onz::TEXT FROM 1 FOR 1)) AS TypeCount,
							COUNT(t.id) AS NumberOfTetrads,
							MAX(p.experiment) AS experiment,
							CASE
							WHEN max(q_view.chains) = 1 THEN 'unimolecular'
							WHEN max(q_view.chains) = 2 THEN  'bimolecular'
							ELSE 'tetramolecular'
							 END 
							 as TypeOfStrands
						FROM QUADRUPLEX q
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
						JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
						JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
						JOIN PDB p ON n1.pdb_id = p.id
						join helix_quadruplex hq on hq.quadruplex_id = q.id
						join helix on helix.id = hq.helix_id
						where helix.id = @HelixId
						GROUP BY q.id;", new {helixId = id});
            }
        }


        public async Task<IEnumerable<NucleotidesChiValues>> GetNucleotideChiValues(int id)
        {		
			using (var connection = Connection)
			{
                connection.Open();

                return await connection.QueryAsync<NucleotidesChiValues>(
                    (@"
						SELECT 
						t.id as tetrad_id,
						n1.chi as n1_chi, 
						n2.chi as n2_chi, 
						n3.chi as n3_chi,
						n4.chi as n4_chi,
						n1.glycosidic_bond as n1_glycosidic_bond,
						n2.glycosidic_bond as n2_glycosidic_bond,
						n3.glycosidic_bond as n3_glycosidic_bond,
						n4.glycosidic_bond as n4_glycosidic_bond
						FROM tetrad t 
						JOIN nucleotide n1 on t.nt1_id = n1.id
						JOIN nucleotide n2 on t.nt2_id = n2.id
						JOIN nucleotide n3 on t.nt3_id = n3.id
						JOIN nucleotide n4 on t.nt4_id = n4.id
						WHERE t.id in (SELECT id
										FROM tetrad
										WHERE quadruplex_id = @Id)"),
                    new {Id = id});
            }
        }

        public async Task<IEnumerable<QuadruplexLoops>> GetQuadruplexLoops(int id)
        {			
			using (var connection = Connection)
			{
                connection.Open();

                return await connection.QueryAsync<QuadruplexLoops>(
                    (@"
						SELECT 
						STRING_AGG(COALESCE(n.short_name, ''), '') AS Short_sequence,
						STRING_AGG(COALESCE(n.full_name, ''), ', ') AS Full_sequence,
						l.loop_type as Loop_type
						FROM quadruplex q
						JOIN loop l on q.id = l.quadruplex_id
						JOIN loop_nucleotide ln on l.id = ln.loop_id
						JOIN nucleotide n on ln.nucleotide_id = n.id
						WHERE q.id = @Id
						GROUP BY l.id"),
                    new {Id = id});
            }
        }


        public async Task<MemoryStream> GetQuadruplex3dVisualization(int quadruplexId)
        {			
			using (var connection = Connection)
			{
                connection.Open();
                var coordinates1Query = await connection.QueryAsync<string>
                (@" 
					SELECT 
						n1.coordinates
					FROM tetrad t
						JOIN nucleotide n1 on t.nt1_id = n1.id
					WHERE t.id IN (select tetrad.Id from quadruplex
			join tetrad on quadruplex.Id = tetrad.quadruplex_id 
			where quadruplex.id = @id) ",
                    new {id = quadruplexId});

                var coordinates2Query = await connection.QueryAsync<string>
                (@" 
					SELECT 
						n2.coordinates
					FROM tetrad t
						JOIN nucleotide n2 on t.nt2_id = n2.id
					WHERE t.id IN (select tetrad.Id from quadruplex
			join tetrad on quadruplex.Id = tetrad.quadruplex_id 
			where quadruplex.id = @id) ",
                    new {id = quadruplexId});

                var coordinates3Query = await connection.QueryAsync<string>
                (@" 
					SELECT 
						n3.coordinates
					FROM tetrad t
						JOIN nucleotide n3 on t.nt3_id = n3.id
					WHERE t.id IN (select tetrad.Id from quadruplex
			join tetrad on quadruplex.Id = tetrad.quadruplex_id 
			where quadruplex.id = @id) ",
                    new {id = quadruplexId});

                var coordinates4Query = await connection.QueryAsync<string>
                (@" 
					SELECT 
						n4.coordinates
					FROM tetrad t
						JOIN nucleotide n4 on t.nt4_id = n4.id
					WHERE t.id IN (select tetrad.Id from quadruplex
			join tetrad on quadruplex.Id = tetrad.quadruplex_id 
			where quadruplex.id = @id) ",
                    new {id = quadruplexId});

                var coordinatesLoop = await connection.QueryAsync<string>
                (@" 
					SELECT coordinates from nucleotide where id IN 
					(select nucleotide_id from loop
					join loop_nucleotide on loop.id = loop_nucleotide.loop_id
					where loop.quadruplex_id = @id);",
                    new {id = quadruplexId});

                var coordinates = new CoordinatesQuadruplex();

                coordinates.C1 = coordinates1Query.ToArray();
                coordinates.C2 = coordinates2Query.ToArray();
                coordinates.C3 = coordinates3Query.ToArray();
                coordinates.C4 = coordinates4Query.ToArray();
                coordinates.LoopNucleotideCoordinates = coordinatesLoop.ToArray();

                var stream = new MemoryStream();
                var writer = new StreamWriter(stream);
                writer.Write(coordinates.CoordinatesAsString);
                writer.Flush();

                stream.Position = 0;
                return stream;
            }
        }
    }
}