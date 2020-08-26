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
		Task<IEnumerable<int>> GetOtherTetradsInTheSamePdb(int tetradId, int pdbId);
		Task<IEnumerable<TetradReference>> FindAllTetradsInTheSameQuadruplex(int id);
    }
}