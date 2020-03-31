using RNAqbase.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public interface IQuadruplexService
	{
		Task<List<Quadruplex>> GetAllQuadruplexes();
		Task<Quadruplex> GetQuadruplexById(int id);
		Task<List<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId);
	}
}
