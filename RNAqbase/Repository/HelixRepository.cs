using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public class HelixRepository : RepositoryBase, IHelixRepository
	{
		public HelixRepository(IConfiguration configuration) : base(configuration)
		{		}

		public async Task<Helix> GetHelixById(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();

				var helix = await connection.QueryFirstAsync<Helix>(
						(@"
                            SELECT DISTINCT ON(h.id)
	                            h.id AS Id,
	                            p.identifier AS PdbIdentifier,
	                            n1.pdb_id AS PdbId,
	                            p.assembly AS AssemblyId,
								max(q_view.molecule) AS Molecule,
	                            STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                            COUNT(t.id) AS NumberOfTetrads,
	                            p.experiment AS Experiment,
	                            COUNT(DISTINCT(q.id)) AS NumberOfQudaruplexes,
	                            h.visualization_2d AS Visualization2D,
	                            h.visualization_3d AS Visualization3D,
	                            h.arc_diagram AS ArcDiagram,
	                        	CASE
									WHEN max(q_view.chains) = 1 THEN 'unimolecular'
									WHEN max(q_view.chains) = 2 THEN  'bimolecular'
									ELSE 'tetramolecular'
								END 
								as NumberOfStrands
                            FROM HELIX h
                            JOIN QUADRUPLEX q on h.id = q.helix_id
                            JOIN QUADRUPLEX_VIEW q_view on q.id = q_view.id
                            JOIN TETRAD t ON q.id = t.quadruplex_id
                            JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
                            JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
                            JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
                            JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
                            JOIN PDB p ON n1.pdb_id = p.id
                            WHERE h.id = @HelixId
                            GROUP BY h.id, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.experiment, h.visualization_2d, h.visualization_3d"), 
				new { HelixId = id });
               
                var idsT = await connection.QueryAsync<int>(
                @"
                SELECT tetrad.id from tetrad join quadruplex 
                on tetrad.quadruplex_id = quadruplex.id
                where quadruplex.helix_id = @HelixId",
                new { HelixId = id });
                helix.Tetrads = idsT.ToList();

                var idsQ = await connection.QueryAsync<int>(
                @"
                SELECT id from quadruplex where id =  @HelixId",
                new { HelixId = id });
                helix.Quadruplexes = idsQ.ToList();

                return helix;
			}
		}

        public async Task<HelixReference> GetHelixReferenceById(int id)
        {
            using (var connection = Connection)
            {
                connection.Open();

                var helix = await connection.QueryFirstAsync<HelixReference>(
                        (@"
                            SELECT DISTINCT ON(h.id)
	                            h.id AS Id,
	                            p.identifier AS PdbIdentifier,
	                            n1.pdb_id AS PdbId,
	                            h.dot_bracket AS Dot_bracket,
                                to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
	                            p.assembly AS AssemblyId,
								max(q_view.molecule) AS Molecule,
	                            STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                            COUNT(t.id) AS NumberOfTetrads,
	                            p.experiment AS Experiment,
	                            COUNT(DISTINCT(q.id)) AS NumberOfQudaruplexes,
	                             h.visualization_2d AS Visualization2D,
	                            h.visualization_3d AS Visualization3D,
	                            h.arc_diagram AS ArcDiagram,
	                       	 CASE
									WHEN max(q_view.chains) = 1 THEN 'unimolecular'
									WHEN max(q_view.chains) = 2 THEN  'bimolecular'
									ELSE 'tetramolecular'
							 END 
							 as NumberOfStrands
                            FROM HELIX h
                            JOIN QUADRUPLEX q on h.id = q.helix_id
                            JOIN QUADRUPLEX_VIEW q_view on q.id = q_view.id
                            JOIN TETRAD t ON q.id = t.quadruplex_id
                            JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
                            JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
                            JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
                            JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
                            JOIN PDB p ON n1.pdb_id = p.id
                            WHERE h.id = @HelixId
                            GROUP BY h.id, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.experiment"),
                new { HelixId = id });

                var idsT = await connection.QueryAsync<int>(
                @"
                SELECT tetrad.id from tetrad join quadruplex 
                on tetrad.quadruplex_id = quadruplex.id
                where quadruplex.helix_id = @HelixId",
                new { HelixId = id });
                helix.Tetrads = idsT.ToList();

                var idsQ = await connection.QueryAsync<int>(
                @"
                SELECT id from quadruplex where id =  @HelixId",
                new { HelixId = id });
                helix.Quadruplexes = idsQ.ToList();

                return helix;
            }
        }

        public async Task<List<HelicesWithoutVisualizations>> GetAllHelices()
	    {
		    using (var connection = Connection)
		    {
			    connection.Open();

			    return (await connection.QueryAsync<HelicesWithoutVisualizations>(
                    @"
                        SELECT DISTINCT ON(h.id)
						h.id AS Id,
						p.identifier AS PdbId,
						to_char(MAX(p.release_date)::date, 'YYYY-MM-DD') as PdbDeposition,
						p.assembly AS AssemblyId,
						max(q_view.molecule) AS Molecule,
						STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
						COUNT(t.id) AS NumberOfTetrads,
						p.experiment AS Experiment,
						COUNT(DISTINCT(q.id)) AS NumberOfQudaruplexes,
						 CASE
								WHEN max(q_view.chains) = 1 THEN 'unimolecular'
								WHEN max(q_view.chains) = 2 THEN  'bimolecular'
								ELSE 'tetramolecular'
						 END 
						 as NumberOfStrands
					FROM HELIX h
					JOIN QUADRUPLEX q on h.id = q.helix_id
					JOIN QUADRUPLEX_VIEW q_view on q.id = q_view.id
					JOIN TETRAD t ON q.id = t.quadruplex_id
					JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
					JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
					JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
					JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
					JOIN PDB p ON n1.pdb_id = p.id
					GROUP BY h.id, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.experiment, h.visualization_2d, h.visualization_3d")).ToList();
		    }
	}
        
       
        
        
        public async Task<MemoryStream> GetHelix3dVisualization(int id)
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
					where quadruplex.id IN (select quadruplex.id from quadruplex where helix_id  = @id))",
					new {id = id});
				
				var coordinates2Query = await connection.QueryAsync<string>
				(@" 
					SELECT 
						n2.coordinates
					FROM tetrad t
							JOIN nucleotide n2 on t.nt2_id = n2.id
					WHERE t.id IN (select tetrad.Id from quadruplex
						join tetrad on quadruplex.Id = tetrad.quadruplex_id 
					where quadruplex.id IN (select quadruplex.id from quadruplex where helix_id  = @id))",
					new {id = id});

				var coordinates3Query = await connection.QueryAsync<string>
				(@" 
					SELECT 
						n3.coordinates
					FROM tetrad t
							JOIN nucleotide n3 on t.nt3_id = n3.id
					WHERE t.id IN (select tetrad.Id from quadruplex
						join tetrad on quadruplex.Id = tetrad.quadruplex_id 
					where quadruplex.id IN (select quadruplex.id from quadruplex where helix_id  = @id))",
					new {id = id});

				var coordinates4Query = await connection.QueryAsync<string>
				(@" 
					SELECT 
						n4.coordinates
					FROM tetrad t
							JOIN nucleotide n4 on t.nt4_id = n4.id
					WHERE t.id IN (select tetrad.Id from quadruplex
						join tetrad on quadruplex.Id = tetrad.quadruplex_id 
					where quadruplex.id IN (select quadruplex.id from quadruplex where helix_id  = @id))",
					new {id = id});
				
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

