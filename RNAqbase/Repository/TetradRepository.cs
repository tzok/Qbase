using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public class TetradRepository : RepositoryBase, ITetradRepository
	{
		public TetradRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<Tetrad> FindById(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var result = await connection.QueryAsync<Tetrad>
				(@"
SELECT t.id, 
	qt.quadruplex_id as ""QuadruplexId"", 
	pdb1.id as ""PdbId"", 
	pdb1.experiment as ""Experiment"",
	COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
	COALESCE(n1.molecule, 'Other') as ""Molecule"",
	COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
	CONCAT(n1.chain, n2.chain, n3.chain, n4.chain) as ""Strands"",
	t.onz as ""OnzClass"",
	t.planarity
FROM tetrade t
	JOIN quadruplex_tetrade qt on t.id = qt.tetrade_id
	JOIN nucleotide n1 on t.nt1_id = n1.id
	JOIN nucleotide n2 on t.nt2_id = n2.id
	JOIN nucleotide n3 on t.nt3_id = n3.id
	JOIN nucleotide n4 on t.nt4_id = n4.id
	JOIN pdb pdb1 on n1.pdb_id = pdb1.id
WHERE t.id = @Id;", new { Id = id });

				return result.FirstOrDefault();
			}
		}

		public async Task<IEnumerable<Tetrad>> FindAll()
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<Tetrad>
				(@"
SELECT t.id, 
	qt.quadruplex_id as ""QuadruplexId"", 
	pdb1.id as ""PdbId"", 
	pdb1.experiment as ""Experiment"",
	--pdb1.visualization as ""PdbVisualization"",
	COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
	COALESCE(n1.molecule, 'Other') as ""Molecule"",
	COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
	CONCAT(n1.chain, n2.chain, n3.chain, n4.chain) as ""Strands"",
	t.onz as ""OnzClass""
FROM tetrade t
	JOIN quadruplex_tetrade qt on t.id = qt.tetrade_id
	JOIN nucleotide n1 on t.nt1_id = n1.id
	JOIN nucleotide n2 on t.nt2_id = n2.id
	JOIN nucleotide n3 on t.nt3_id = n3.id
	JOIN nucleotide n4 on t.nt4_id = n4.id
	JOIN pdb pdb1 on n1.pdb_id = pdb1.id
ORDER BY t.id;");
			}
		}

		public async Task<IEnumerable<int>> GetOtherTetradsInTheSameQuadruplex(int tetradId, int quadruplexId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
					(@"
SELECT tetrade_id
FROM quadruplex_tetrade
WHERE quadruplex_id = @QuadruplexId 
	AND tetrade_id <> @TetradId;", new { QuadruplexId = quadruplexId, TetradId = tetradId });
			}
		}

		public async Task<IEnumerable<int>> GetOtherTetradsInTheSamePdb(int tetradId, string pdbId)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<int>
				(@"
SELECT t.id
FROM tetrade t
	JOIN nucleotide n1 on t.nt1_id = n1.id
WHERE n1.pdb_id = @PdbId 
	AND t.id <> @TetradId;", new { PdbId = pdbId, TetradId = tetradId });
			}
		}

		public async Task<IEnumerable<Tetrad>> FindAllTetradsByQuadruplexId(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<Tetrad>
				(@"
SELECT t.id, 
	qt.quadruplex_id as ""QuadruplexId"", 
	pdb1.id as ""PdbId"", 
	pdb1.experiment as ""Experiment"",
	--pdb1.visualization as ""PdbVisualization"",
	COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
	COALESCE(n1.molecule, 'Other') as ""Molecule"",
	COALESCE((n1.short_name)||(n2.short_name)||(n3.short_name)||(n4.short_name), '') as ""Sequence"",
	CONCAT(n1.chain, n2.chain, n3.chain, n4.chain) as ""Strands"",
	t.onz as ""OnzClass"",
	ts.rise,
	ts.twist
FROM tetrade t
	JOIN quadruplex_tetrade qt on t.id = qt.tetrade_id
	JOIN nucleotide n1 on t.nt1_id = n1.id
	JOIN nucleotide n2 on t.nt2_id = n2.id
	JOIN nucleotide n3 on t.nt3_id = n3.id
	JOIN nucleotide n4 on t.nt4_id = n4.id
	JOIN pdb pdb1 on n1.pdb_id = pdb1.id
	JOIN tetrade_stack ts on t.id = ts.tetrade1_id
WHERE qt.quadruplex_id = @QuadruplexId
ORDER BY t.id;", new { QuadruplexId = id});
			}
		}
	}
}
