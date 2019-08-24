using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace RNAqbase.Repository
{
	public class QuadruplexRepository : RepositoryBase, IQuadruplexRepository
	{
		public QuadruplexRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<IEnumerable<int>> GetQuadruplexesByPdbId(string pdbId, int quadruplexId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
				(@"
SELECT qt.quadruplex_id
FROM quadruplex_tetrade qt
	JOIN tetrade t on t.id=qt.tetrade_id
	JOIN nucleotide n on t.nt1_id=n.id
WHERE n.pdb_id=@PdbId
	AND qt.quadruplex_id <> @QuadruplexId;", new { QuadruplexId = quadruplexId, PdbId = pdbId });
			}
		}
	}
}
