using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public class StatisticsRepository : RepositoryBase, IStatisticsRepository
	{
		public StatisticsRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<List<Statistics>> GetTopologyBaseTetradViewTableOne()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT sequence,
SUM(CASE tv.molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
SUM(CASE tv.molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
SUM(CASE tv.molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
COUNT(*) AS Total
FROM tetrad_view tv
JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
WHERE qv.count > 1
GROUP BY sequence
UNION ALL
SELECT 'Total',
SUM(CASE tv.molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
SUM(CASE tv.molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
SUM(CASE tv.molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
COUNT(*) AS Total
FROM tetrad_view tv
JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
WHERE qv.count > 1;")).ToList();
			}
		}

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableTwo()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT CAST(count AS text) AS NumberOfTetrads,
SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
COUNT(*) AS Total
FROM quadruplex_view
GROUP BY count
UNION ALL
SELECT 'Total',
SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
COUNT(*) AS Total
FROM quadruplex_view;")).ToList();
			}
		}

		public Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere()
		{
			throw new NotImplementedException();
		}

		public Task<List<Statistics>> GetElTetradoTetradViewTableOne()
		{
			throw new NotImplementedException();
		}

		public Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo()
		{
			throw new NotImplementedException();
		}

		public Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA()
		{
			throw new NotImplementedException();
		}

		public Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB()
		{
			throw new NotImplementedException();
		}
	}
}




