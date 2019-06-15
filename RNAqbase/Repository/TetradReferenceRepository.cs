using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public class TetradReferenceRepository : RepositoryBase, IRepository<TetradReference>
	{
		public TetradReferenceRepository(IConfiguration configuration) :base (configuration)
		{
		}

		public async Task<TetradReference> FindById(int id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var result = await connection.QueryAsync<TetradReference>
				(@"
SELECT t.id, 
	qt.quadruplex_id as ""QuadruplexId"", 
	pdb1.id as ""PdbId"", 
	pdb1.assembly as ""AssemblyId"",
	n1.molecule,
	(n1.full_name)||(n2.full_name)||(n3.full_name)||(n4.full_name) as ""sequence"",
	t.onz
FROM tetrade t
	JOIN quadruplex_tetrade qt on t.id = qt.tetrade_id
	JOIN nucleotide n1 on t.nt1_id = n1.id
	JOIN nucleotide n2 on t.nt2_id = n2.id
	JOIN nucleotide n3 on t.nt3_id = n3.id
	JOIN nucleotide n4 on t.nt4_id = n4.id
	JOIN pdb pdb1 on n1.pdb_id = pdb1.id
WHERE t.id = @Id;", new {Id = id});

				return result.FirstOrDefault();
			}
		}

		public async Task<IEnumerable<TetradReference>> FindAll()
		{
			using (var connection = Connection)
			{
				connection.Open();
				return await connection.QueryAsync<TetradReference>
				(@"
SELECT t.id, 
	qt.quadruplex_id as ""QuadruplexId"", 
	pdb1.id as ""PdbId"", 
	COALESCE(pdb1.assembly, 0) as ""AssemblyId"",
	COALESCE(n1.molecule, 'Other') as ""Molecule"",
	COALESCE((n1.full_name)||(n2.full_name)||(n3.full_name)||(n4.full_name), '') as ""Sequence"",
	COALESCE(t.onz, 'Op') as ""Onz""
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
	}
}
