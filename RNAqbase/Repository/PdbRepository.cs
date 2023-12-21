using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

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
					WHERE identifier = @PdbId;", new { PdbId = pdbId });

				return result.FirstOrDefault();
			}
		}

		public async Task<MemoryStream> GetVisualization3dByPdbId(string pdbId, int assembly)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var result = await connection.QueryFirstAsync<string>
				(@"
					SELECT coordinates 
					FROM pdb 
					WHERE pdb.identifier = @PdbId and assembly  = @Assembly", new { PdbId = pdbId, Assembly = assembly });

				var stream = new MemoryStream();
				var writer = new StreamWriter(stream);
				writer.Write(result);
				writer.Flush();
				stream.Position = 0;
				return stream;
			}
		}

	}
}

