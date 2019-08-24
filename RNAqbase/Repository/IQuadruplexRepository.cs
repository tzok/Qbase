using System.Collections.Generic;
using System.Threading.Tasks;

namespace RNAqbase.Repository
{
	public interface IQuadruplexRepository
	{
		Task<IEnumerable<int>> GetQuadruplexesByPdbId(string pdbId, int quadruplexId);
	}
}
