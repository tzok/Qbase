using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace RNAqbase.Repository
{
	public class PdbRepository : RepositoryBase
	{
		public PdbRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<string> GetVisualizationByPdbId(string pdbId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var result = await connection.QueryAsync<string>
					(@"
					SELECT visualization_2d
					FROM pdb
					WHERE identifier = @PdbId;", new {PdbId = pdbId});

				return result.FirstOrDefault();
			}
		}

	}
}
