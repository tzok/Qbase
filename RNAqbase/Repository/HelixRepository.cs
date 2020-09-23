using System;
using System.Collections.Generic;
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
	                            n1.molecule AS Molecule,
	                            STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                            COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) AS NumberOfStrands,
	                            COUNT(t.id) AS NumberOfTetrads,
	                            p.experiment AS Experiment,
	                            COUNT(q.id) AS NumberOfQudaruplexes,
	                            h.visualization_2d AS Visualization2D,
	                            h.visualization_3d AS Visualization3D
                            FROM HELIX h
                            JOIN QUADRUPLEX q on h.id = q.helix_id
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

	public async Task<List<Helix>> GetAllHelices()
	{
		using (var connection = Connection)
		{
			connection.Open();

			return (await connection.QueryAsync<Helix>(
				@"
                    SELECT DISTINCT ON(h.id)
	                    h.id AS Id,
	                    p.identifier AS PdbIdentifier,
	                    n1.pdb_id AS PdbId,
	                    p.assembly AS AssemblyId,
	                    n1.molecule AS Molecule,
	                    STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                    COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) AS NumberOfStrands,
	                    COUNT(t.id) AS NumberOfTetrads,
	                    p.experiment AS Experiment,
	                    COUNT(q.id) AS NumberOfQudaruplexes,
	                    h.visualization_2d AS Visualization2D,
	                    h.visualization_3d AS Visualization3D
                    FROM HELIX h
                    JOIN QUADRUPLEX q on h.id = q.helix_id
                    JOIN TETRAD t ON q.id = t.quadruplex_id
                    JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
                    JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
                    JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
                    JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
                    JOIN PDB p ON n1.pdb_id = p.id
                    GROUP BY h.id, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.experiment, h.visualization_2d, h.visualization_3d
                    HAVING COUNT(h.id) > 1")).ToList();
		}
	}


    
}
}

