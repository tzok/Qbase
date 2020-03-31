using System.Collections.Generic;
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

		public async Task<IEnumerable<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
				(@"
SELECT t.quadruplex_id
FROM tetrad t
	JOIN nucleotide n on t.nt1_id=n.id
WHERE n.pdb_id=@PdbId
	AND t.quadruplex_id <> @QuadruplexId;", new { QuadruplexId = quadruplexId, PdbId = pdbId });
			}
		}
	}
}
