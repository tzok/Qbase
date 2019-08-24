using System.Collections.Generic;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public interface ITetradRepository
	{
		Task<Tetrad> FindById(int id);
		Task<IEnumerable<Tetrad>> FindAll();
		Task<IEnumerable<int>> GetOtherTetradsInTheSameQuadruplex(int tetradId, int quadruplexId);
		Task<IEnumerable<int>> GetOtherTetradsInTheSamePdb(int tetradId, string pdbId);
		Task<IEnumerable<Tetrad>> FindAllTetradsByQuadruplexId(int id);
	}
}