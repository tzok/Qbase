using System;
using System.Collections.Generic;
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
		public QuadruplexRepository(IConfiguration configuration) : base(configuration)
		{
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
	q.onzm AS OnzmClass,
	p.identifier AS PdbIdentifier,
	n1.pdb_id AS PdbId,
	q.dot_bracket AS Dot_bracket,
	p.assembly AS AssemblyId,
	MAX(q_view.molecule) AS Molecule,
	STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	COUNT(DISTINCT(t.onz)) AS TypeCount,
	COUNT(t.id) AS NumberOfTetrads,
	p.visualization_2d AS PdbVisualization,
	p.experiment AS Experiment,
	q.visualization_2d AS Visualization2D,
	q.arc_diagram AS ArcDiagram,
	q.visualization_3d AS Visualization3D,
	CASE
			WHEN max(q_view.chains) = 1 THEN 'unimolecular'
			WHEN max(q_view.chains) = 2 THEN  'bimolecular'
			ELSE 'tetramolecular'
	 END 
	 as NumberOfStrands
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
JOIN PDB p ON n1.pdb_id = p.id
WHERE q.id = @QuadruplexId
GROUP BY q.id, q.onzm, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.visualization_2d, p.experiment, q.visualization_2d, q.arc_diagram, q.visualization_3d",
					
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

		public async Task<List<QuadruplexesWithoutVisualizations>> GetAllQuadruplexes()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<QuadruplexesWithoutVisualizations>(
                    @"
						SELECT
							MAX(q.id) AS Id,
							MAX(q.onzm) AS OnzmClass,
							to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
							MAX(p.identifier) AS PdbId,
							MAX(p.assembly) AS AssemblyId,
							MAX(q_view.molecule) AS Molecule,
							STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
							COUNT(DISTINCT(t.onz)) AS TypeCount,
							COUNT(t.id) AS NumberOfTetrads,
							MAX(p.experiment) AS experiment,
							CASE
									WHEN max(q_view.chains) = 1 THEN 'unimolecular'
									WHEN max(q_view.chains) = 2 THEN  'bimolecular'
									ELSE 'tetramolecular'
							 END 
							 as NumberOfStrands
						FROM QUADRUPLEX q
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
						JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
						JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
						JOIN PDB p ON n1.pdb_id = p.id
						GROUP BY q.id
						HAVING COUNT(t.id) > 1")).ToList();
			}
		}
		
		
		
		public async Task<List<Structure>> GetAllStructures()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Structure>(
					@"
						SELECT
						string_agg(CAST(q.id AS TEXT), ',') as Quadruplex_id,
						p.identifier AS PdbId,
						to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
						MAX(p.assembly) AS AssemblyId,
						MAX(q_view.molecule) AS Molecule,
						MAX(p.experiment) AS experiment
						FROM 
						QUADRUPLEX as q  
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN PDB p ON n1.pdb_id = p.id
						GROUP BY p.identifier")).ToList();
			}
		}		
		
		
		/*
		 CREATE VIEW structure_growth_view AS

SELECT
count(p.identifier) AS StructureCount,
p.release_date as release_date
FROM 
QUADRUPLEX as q  
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN PDB p ON n1.pdb_id = p.id
GROUP BY p.release_date
		 */
		
		
		
		
		

		public async Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();

				return await connection.QueryAsync<Quadruplex>(
                    @"
                 SELECT
	                MAX(q.id) AS Id,
	                MAX(q.onzm) AS OnzmClass,
	                MAX(p.identifier) AS PdbIdentifier, 
	                to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
	                MAX(n1.pdb_id) AS PdbId,
	                MAX(p.assembly) AS AssemblyId,
	MAX(q_view.molecule) AS Molecule,
	                STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                COUNT(DISTINCT(t.onz)) AS TypeCount,
	                COUNT(t.id) AS NumberOfTetrads,
	                MAX(p.experiment) AS experiment,
	                CASE
			WHEN max(q_view.chains) = 1 THEN 'unimolecular'
			WHEN max(q_view.chains) = 2 THEN  'bimolecular'
			ELSE 'tetramolecular'
	 END 
	 as NumberOfStrands
                FROM QUADRUPLEX q
                JOIN TETRAD t ON q.id = t.quadruplex_id
                JOIN QUADRUPLEX_VIEW q_view ON q.id = q_view.id
                JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
                JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
                JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
                JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
                JOIN PDB p ON n1.pdb_id = p.id
                join helix on helix.id = q.helix_id
                where helix.id = @helixId
                GROUP BY q.id;", new {helixId = id});
			}
		}
		
		public async Task<string> AddEmailToDatabase(string email)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var ids = await connection.QueryAsync<int>(
					@"
					INSERT INTO email (email)
                          VALUES (@email)", new {@email = email});
				
				return ("DONE");
				
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
				
				var coordinates = new CoordinatesQuadruplex();
				
				coordinates.C1 = coordinates1Query.ToArray();
				coordinates.C2 = coordinates2Query.ToArray();
				coordinates.C3 = coordinates3Query.ToArray();
				coordinates.C4 = coordinates4Query.ToArray();
				
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