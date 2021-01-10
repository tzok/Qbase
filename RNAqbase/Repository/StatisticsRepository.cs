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

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
				SELECT CAST(chains AS text),
				SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
				SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
				SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
				COUNT(*) AS Total
				FROM quadruplex_view
				GROUP BY chains
				UNION ALL
				SELECT 'Total',
				SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
				SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
				SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
				COUNT(*) AS Total
				FROM quadruplex_view;")).ToList();
			}
		}

		public async Task<List<Statistics>> GetElTetradoTetradViewTableOne()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT CAST(onz AS text),
SUM(CASE tv.chains WHEN 1 THEN 1 ELSE 0 END) AS Unimolecular,
SUM(CASE tv.chains WHEN 2 THEN 1 ELSE 0 END) AS Bimolecular,
SUM(CASE tv.chains WHEN 4 THEN 1 ELSE 0 END) AS Tetramolecular,
COUNT(*) AS Total
FROM tetrad_view tv
JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
WHERE qv.count > 1
GROUP BY onz
UNION ALL
SELECT 'Total',
SUM(CASE tv.chains WHEN 1 THEN 1 ELSE 0 END) AS Unimolecular,
SUM(CASE tv.chains WHEN 2 THEN 1 ELSE 0 END) AS Bimolecular,
SUM(CASE tv.chains WHEN 4 THEN 1 ELSE 0 END) AS Tetramolecular,
COUNT(*) AS Total
FROM tetrad_view tv
JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
WHERE qv.count > 1;")).ToList();
			}
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT CAST(onzm AS text),
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 1
GROUP BY onzm
UNION ALL
SELECT 'Total',
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 1;")).ToList();
			}
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT CAST(onzm AS text),
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 2
GROUP BY onzm
UNION ALL
SELECT 'Total',
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 2;")).ToList();
			}
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Statistics>(
					@"
SELECT CAST(onzm AS text),
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 4
GROUP BY onzm
UNION ALL
SELECT 'Total',
SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
COUNT(*) AS Total
FROM quadruplex_view
WHERE chains = 4;")).ToList();
			}
		}
		
		
		public async Task<HomePagePlot> GetCountOfComponents()
		{
			
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryFirstAsync<HomePagePlot>(
					@"select (select count(*) from quadruplex) as QuadruplexCount,
						  (select count(*) from helix_new) as HelixCount,
						   (select count(*) from tetrad) as TetradCount
						   "));
			}
		}

		
		public async Task<HomePagePlot> GetUpdateInformations()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryFirstAsync<HomePagePlot>(
					@"select to_char(t.release_date::date, 'YYYY-MM-DD') as PdbRelease,
							COALESCE(numberOfTetrad,0) as AddedTetradCount,
							COALESCE(numberOfQuadruplex, 0) as AddedQuadruplexCount,
							COALESCE(numberOfHelix, 0) as AddedHelixCount
							from tetrad_growth_view t
							left join quadruplex_growth_view q  on t.release_date = q.release_date
							left join helix_growth_view h on t.release_date = h.release_date
							WHERE t.release_date = (select max(release_date) from tetrad_growth_view)
						   "));
			}
		}

	}
}




