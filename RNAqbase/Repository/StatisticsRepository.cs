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
					   (select count(DISTINCT(helix_id)) from helix_quadruplex) as HelixCount,
					   (select count(*) from tetrad) as TetradCount, 
					   (select count(x) as StructureCount from
						(SELECT p.identifier
						FROM 
						QUADRUPLEX as q  
						JOIN TETRAD t ON q.id = t.quadruplex_id
						JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
						JOIN PDB p ON n1.pdb_id = p.id
						GROUP BY p.identifier, p.assembly) as x)"));
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
						COALESCE(numberOfHelix, 0) as AddedHelixCount,
					    COALESCE(numberOfStructure, 0) as AddedStructureCount
						from tetrad_growth_view t
						left join quadruplex_growth_view q  on t.release_date = q.release_date
						left join helix_growth_view h on t.release_date = h.release_date
						left join structure_growth_view s on t.release_date = s.release_date
						WHERE t.release_date = (select max(release_date) from tetrad_growth_view)
						"));
				
			}
		}
	}
}

/*
 * select count(*) as Total, s2.Loop_length, s2.Loop_type from (
SELECT 
	LENGTH(STRING_AGG(COALESCE(n.short_name, ''), '')) as Loop_length,
	l.loop_type as Loop_type
	FROM quadruplex q
	JOIN loop l on q.id = l.quadruplex_id
	JOIN loop_nucleotide ln on l.id = ln.loop_id
	JOIN nucleotide n on ln.nucleotide_id = n.id
	GROUP BY l.id) as s2
	group by s2.Loop_length, s2.Loop_type
	order by Total
 */


/*
 * select count(*) as Total, gba_quadruplex_class from QUADRUPLEX_GBA group by gba_quadruplex_class order by gba_quadruplex_class;

 */

/*
 * SELECT
	count(*) as Total,
	loop_class
FROM quadruplex 
group by loop_class
order by loop_class
 */

/*
SELECT 
	min(t.planarity_deviation) as min_planarity, max(t.planarity_deviation) as max_planarity,
	min(tp.rise) as min_rise, max(tp.rise) as max_rise,
	min(tp.twist) as min_twist, max(tp.twist) as max_twist
FROM tetrad t
	LEFT JOIN tetrad_pair tp on t.id = tp.tetrad1_id
*/

/*
	
SELECT 
	min(chi) as min_chi, 
	max(chi) as max_chi, 
	glycosidic_bond as glycosidic_bond, 
	onzm as onzm
 	from( (SELECT 
	q.onzm as onzm,
	n1.chi as chi,
    n1.glycosidic_bond as glycosidic_bond
	FROM tetrad t 
	JOIN quadruplex q on q.id = t.quadruplex_id
	JOIN nucleotide n1 on t.nt1_id = n1.id)
UNION ALL
	(SELECT 
	 q.onzm as onzm,
	n2.chi as chi,
    n2.glycosidic_bond as glycosidic_bond
	FROM tetrad t 
	JOIN quadruplex q on q.id = t.quadruplex_id
	JOIN nucleotide n2 on t.nt2_id = n2.id)
UNION ALL
	(SELECT 
	 q.onzm as onzm,
	n3.chi as chi,
    n3.glycosidic_bond as glycosidic_bond
	FROM tetrad t 
	JOIN quadruplex q on q.id = t.quadruplex_id
	JOIN nucleotide n3 on t.nt3_id = n3.id)
UNION ALL
	(SELECT 
	 q.onzm as onzm,
	n4.chi as chi,
    n4.glycosidic_bond as glycosidic_bond
	FROM tetrad t 
	JOIN quadruplex q on q.id = t.quadruplex_id
	JOIN nucleotide n4 on t.nt4_id = n4.id)) as t
group by glycosidic_bond, onzm

*/

/*
 * select *, count(*) as total from (SELECT
	MAX(q.onzm) AS OnzmClass,
	string_agg(DISTINCT(ion.name)::text, ', ') as Ion,
	pdb_ion.count as pdb_ion_count
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN PDB p ON n1.pdb_id = p.id
JOIN pdb_ion ON p.id = pdb_ion.pdb_id
JOIN ion ON ion.id = pdb_ion.ion_id
GROUP BY q.id, Count) as t
group by t.OnzmClass, t.ion, t.pdb_ion_count
*/