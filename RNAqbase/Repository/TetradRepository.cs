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
	public class TetradRepository : RepositoryBase, ITetradRepository
	{

		public TetradRepository(IConfiguration configuration) : base(configuration)
		{}
		public async Task<TetradDescription> FindById(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var result = await connection.QueryAsync<TetradDescription>
				(@"
					SELECT t.id, 
						t.quadruplex_id as ""QuadruplexIdAsInt"", 
						t.dot_bracket as ""Dot_bracket"",
						pdb1.identifier as ""PdbIdentifier"", 
						pdb1.id as ""PdbId"", 
						pdb1.experiment as ""Experiment"",
						COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
						COALESCE(n1.molecule, 'Other') as ""Molecule"",
						COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
						CONCAT(n1.chain, n2.chain, n3.chain, n4.chain) as ""Strands"",
						t.onz as ""OnzClass"",
						t.planarity_deviation as ""Planarity"",
						(SELECT count(*) from tetrad tcount where tcount.quadruplex_id = t.quadruplex_id) as ""TetradsInQuadruplex""
					FROM tetrad t
						JOIN nucleotide n1 on t.nt1_id = n1.id
						JOIN nucleotide n2 on t.nt2_id = n2.id
						JOIN nucleotide n3 on t.nt3_id = n3.id
						JOIN nucleotide n4 on t.nt4_id = n4.id
						JOIN pdb pdb1 on n1.pdb_id = pdb1.id
					WHERE t.id = @Id;", new { Id = id });
				return result.FirstOrDefault();
			}
		}

		public async Task<IEnumerable<TetradTable>> FindAll()
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<TetradTable>
				(@"
					SELECT t.id, 
						t.quadruplex_id as ""QuadruplexId"", 
						pdb1.identifier as ""PdbId"", 
						to_char(pdb1.release_date::date, 'YYYY-MM-DD') as ""PdbDeposition"",
						COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
						COALESCE(n1.molecule, 'Other') as ""Molecule"",
						COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
						t.onz as ""OnzClass""
					FROM tetrad t
						JOIN quadruplex q on t.quadruplex_id = q.id
						JOIN nucleotide n1 on t.nt1_id = n1.id
						JOIN nucleotide n2 on t.nt2_id = n2.id
						JOIN nucleotide n3 on t.nt3_id = n3.id
						JOIN nucleotide n4 on t.nt4_id = n4.id
						JOIN pdb pdb1 on n1.pdb_id = pdb1.id
					ORDER BY t.id;");
			}
		}

		public async Task<IEnumerable<int>> GetOtherTetradsInTheSameQuadruplex(int tetradId, int quadruplexId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
				(@"
					SELECT id
					FROM tetrad
					WHERE quadruplex_id = @QuadruplexId 
						AND id <> @TetradId;", new {QuadruplexId = quadruplexId, TetradId = tetradId});
			}
		}

		public async Task<IEnumerable<int>> GetOtherTetradsInTheSamePdb(int tetradId, int pdbId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
				(@"
					SELECT t.id
					FROM tetrad t
						JOIN nucleotide n1 on t.nt1_id = n1.id
					WHERE n1.pdb_id = @PdbId 
						AND t.id <> @TetradId;", new { PdbId = pdbId, TetradId = tetradId });
			}
		}

		public async Task<IEnumerable<TetradReference>> FindAllTetradsInTheSameQuadruplex(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<TetradReference>
				(@"
	                SELECT t.id, 
		                COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
		                t.onz as ""OnzClass"",
		                t.planarity_deviation as ""Planarity"",
		                tp.rise,
		                tp.twist,
		                tp.tetrad2_id, 
		                tp.direction
	                FROM tetrad t
		                JOIN nucleotide n1 on t.nt1_id = n1.id
		                JOIN nucleotide n2 on t.nt2_id = n2.id
		                JOIN nucleotide n3 on t.nt3_id = n3.id
		                JOIN nucleotide n4 on t.nt4_id = n4.id
		                LEFT JOIN tetrad_pair tp on t.id = tp.tetrad1_id
	                WHERE t.quadruplex_id = @QuadruplexId
	                ORDER BY t.id;", new { QuadruplexId = id });
			}
		}
		
		public async Task<IEnumerable<TetradReference>> FindAllTetradsInTheSameHelix(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<TetradReference>
				(@"
	                SELECT t.id, 
		                COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
		                t.onz as ""OnzClass"",
		                t.planarity_deviation as ""Planarity"",
		                tp.rise,
		                tp.twist,
		                tp.tetrad2_id, 
		                tp.direction,
						t.quadruplex_id as ""Quadruplex_id"",
                		t2.quadruplex_id as ""Quadruplex_pair_id""
					FROM tetrad t
						JOIN nucleotide n1 on t.nt1_id = n1.id
						JOIN nucleotide n2 on t.nt2_id = n2.id
						JOIN nucleotide n3 on t.nt3_id = n3.id
						JOIN nucleotide n4 on t.nt4_id = n4.id
						LEFT JOIN tetrad_pair tp on t.id = tp.tetrad1_id
                		LEFT JOIN tetrad t2 on t2.id = tp.tetrad2_id
					WHERE t.quadruplex_id IN (select quadruplex_id from helix_quadruplex where helix_id = @HelixId)
					ORDER BY  t.id;", new { HelixId = id });
			}
		}

		public async Task<MemoryStream> GetTetrad3dVisualization(int tetradId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var coordinates = await connection.QueryFirstAsync<Coordinates>
				(@"
					SELECT 
						n1.coordinates as c1,
						n2.coordinates as c2,
						n3.coordinates as c3,
						n4.coordinates as c4
					FROM tetrad t
						JOIN nucleotide n1 on t.nt1_id = n1.id
						JOIN nucleotide n2 on t.nt2_id = n2.id
						JOIN nucleotide n3 on t.nt3_id = n3.id
						JOIN nucleotide n4 on t.nt4_id = n4.id
					WHERE t.id = @Id;", new { Id = tetradId });

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
