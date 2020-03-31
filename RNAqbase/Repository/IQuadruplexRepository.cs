using System.Collections.Generic;
using System.Threading.Tasks;

namespace RNAqbase.Repository
{
	public interface IQuadruplexRepository
	{
		Task<IEnumerable<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId);
	}
}
