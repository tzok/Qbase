using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace RNAqbase.Repository
{
	public class RepositoryBase
	{
		private readonly string connectionString;

		public RepositoryBase(IConfiguration configuration)
		{
			connectionString = configuration.GetConnectionString("RnaqbaseConnectionString");
		}

		internal IDbConnection Connection => new NpgsqlConnection(connectionString);
	}
}
