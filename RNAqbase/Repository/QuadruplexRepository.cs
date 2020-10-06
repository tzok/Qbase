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
SELECT DISTINCT ON (q.id)
	q.id AS Id,
	q.onzm AS OnzmClass,
	p.identifier AS PdbIdentifier,
	n1.pdb_id AS PdbId,
	p.assembly AS AssemblyId,
	n1.molecule AS Molecule,
	STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	COUNT(DISTINCT(t.onz)) AS TypeCount,
	COUNT(t.id) AS NumberOfTetrads,
	p.visualization_2d AS PdbVisualization,
	p.experiment AS Experiment,
	q.visualization_2d AS Visualization2D,
	q.arc_diagram AS ArcDiagram,
	q.visualization_3d AS Visualization3D,
	CASE
		WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 1 THEN 'unimolecular'
		WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 2 THEN  'bimolecular'
	    WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 3 THEN  'tetramolecular'
		ELSE ''
 END 
 as NumberOfStrands
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
JOIN PDB p ON n1.pdb_id = p.id
WHERE q.id = @QuadruplexId
GROUP BY q.id, q.onzm, p.identifier, n1.pdb_id, p.assembly, n1.molecule, p.visualization_2d, p.experiment, q.visualization_2d, q.arc_diagram, q.visualization_3d",
					new {QuadruplexId = id});

				var ids = await connection.QueryAsync<int>(
					@"
SELECT t.id
FROM QUADRUPLEX q
JOIN TETRAD t ON q.id = t.quadruplex_id
WHERE  q.id = @QuadruplexId",
					new {QuadruplexId = id});

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
	                    to_char(MAX(p.release_date)::date, 'DD-MM-YYYY') as PdbDeposition,
	                    MAX(n1.pdb_id) AS PdbId,
	                    MAX(p.assembly) AS AssemblyId,
	                    MAX(n1.molecule) AS Molecule,
	                    STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
						COUNT(DISTINCT(t.onz)) AS TypeCount,
	                    COUNT(t.id) AS NumberOfTetrads,
	                    MAX(p.experiment) AS experiment,
						CASE
								WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 1 THEN 'unimolecular'
								WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 2 THEN  'bimolecular'
							    WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 3 THEN  'tetramolecular'
								ELSE ''
					     END 
						 as NumberOfStrands
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

		public async Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();

				return await connection.QueryAsync<Quadruplex>(
                    @"
                 SELECT
	                MAX(q.id) AS Id,
	                MAX(q.onzm) AS OnzmClass,
	                MAX(p.identifier) AS PdbIdentifier, 
	                to_char(MAX(p.release_date)::date, 'DD-MM-YYYY') as PdbDeposition,
	                MAX(n1.pdb_id) AS PdbId,
	                MAX(p.assembly) AS AssemblyId,
	                MAX(n1.molecule) AS Molecule,
	                STRING_AGG(COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), ''), '') AS Sequence,
	                COUNT(DISTINCT(t.onz)) AS TypeCount,
	                COUNT(t.id) AS NumberOfTetrads,
	                MAX(p.experiment) AS experiment,
	                CASE
						WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 1 THEN 'unimolecular'
						WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 2 THEN  'bimolecular'
					    WHEN COUNT(DISTINCT(CONCAT(n1.chain, n2.chain, n3.chain, n4.chain))) = 3 THEN  'tetramolecular'
						ELSE ''
				 END 
 as NumberOfStrands
                FROM QUADRUPLEX q
                JOIN TETRAD t ON q.id = t.quadruplex_id
                JOIN NUCLEOTIDE n1 ON t.nt1_id = n1.id
                JOIN NUCLEOTIDE n2 ON t.nt2_id = n2.id
                JOIN NUCLEOTIDE n3 ON t.nt3_id = n3.id
                JOIN NUCLEOTIDE n4 ON t.nt4_id = n4.id
                JOIN PDB p ON n1.pdb_id = p.id
                join helix on helix.id = q.helix_id
                where helix.id = @helixId
                GROUP BY q.id;", new {helixId = id});
			}
		}
	}
}