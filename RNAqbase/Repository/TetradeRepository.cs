using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public class TetradeRepository : RepositoryBase, IRepository<Tetrad>
	{
		public TetradeRepository(IConfiguration configuration) : base (configuration) {}

		public async Task<Tetrad> FindById(int id)
		{
			using (var connection = Connection)
			{
				var result = new List<Tetrad>();
				connection.Open();
				try
				{
					result = (await connection.QueryAsync<Tetrad>
						(@"
SELECT t.id, 
	qt.quadruplex_id, 
	pdb1.id, pdb1.assembly,
	n1.molecule,
	(n1.full_name)||(n2.full_name)||(n3.full_name)||(n4.full_name),
	t.onz
FROM tetrade t
	JOIN quadruplex_tetrade qt on t.id = qt.tetrade_id
	JOIN nucleotide n1 on t.nt1_id = n1.id
	JOIN nucleotide n2 on t.nt2_id = n2.id
	JOIN nucleotide n3 on t.nt3_id = n3.id
	JOIN nucleotide n4 on t.nt4_id = n4.id
	JOIN pdb pdb1 on n1.pdb_id = pdb1.id;
WHERE t.id = @
", new { Id = id })).ToList();
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
					throw;
				}
				

				return result.FirstOrDefault();
			}
		}

		public async Task<IEnumerable<Tetrad>> FindAll()
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<Tetrad>("SELECT * FROM tetrade");
			}
		}
	}
}
