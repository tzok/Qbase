using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

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
	AND t.quadruplex_id <> @QuadruplexId;",
					new
					{
						QuadruplexId = quadruplexId,
						PdbId = pdbId
					});
			}
		}

		public async Task<Quadruplex> GetQuadruplexById(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();

				var quadruplex = await connection.QueryFirstAsync<Quadruplex>(
					@"
SELECT
	MAX(q.id) AS Id,
	MAX(q.onzm) AS OnzmClass,
	MAX(p.identifier) AS PdbIdentifier,
	MAX(n1.pdb_id) AS PdbId,
	MAX(p.assembly) AS AssemblyId,
	MAX(n1.molecule) AS Molecule,
	STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) AS NumberOfStrands,
	COUNT(DISTINCT(t.onz)) AS TypeCount,
	COUNT(t.id) AS NumberOfTetrads,
	MAX(p.visualization_2d) AS PdbVisualization,
	MAX(p.experiment) AS Experiment,
	MAX(q.visualization_2d) AS Visualization2D,
	MAX(q.arc_diagram) AS ArcDiagram
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
JOIN PDB p ON n1.pdb_id = p.id
WHERE q.id = @QuadruplexId
GROUP BY q.id",
					new { QuadruplexId = id });

				var ids = await connection.QueryAsync<int>(
					@"
SELECT t.id
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
WHERE  q.id = @QuadruplexId",
					new { QuadruplexId = id });

				quadruplex.Tetrads = ids.ToList();

				return quadruplex;
			}
		}

		public async Task<List<Quadruplex>> GetAllQuadruplexes()
		{
			using (var connection = Connection)
			{
				connection.Open();

				return (await connection.QueryAsync<Quadruplex>(
					@"
SELECT
	MAX(q.id) AS Id,
	MAX(q.onzm) AS OnzmClass,
	MAX(p.identifier) AS PdbIdentifier,
	MAX(p.release_date) as PdbDeposition,
	MAX(n1.pdb_id) AS PdbId,
	MAX(p.assembly) AS AssemblyId,
	MAX(n1.molecule) AS Molecule,
	STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) AS NumberOfStrands,
	COUNT(DISTINCT(t.onz)) AS TypeCount,
	COUNT(t.id) AS NumberOfTetrads,
	MAX(p.experiment) AS experiment
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
JOIN PDB p ON n1.pdb_id = p.id
GROUP BY q.id
HAVING COUNT(t.id) > 1")).ToList();
			}
		}
	}
}
