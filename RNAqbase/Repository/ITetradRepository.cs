using System.Collections.Generic;
using System.IO;
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
		Task<IEnumerable<TetradReference>> FindAllTetradsInTheSameHelix(int id);
		Task<MemoryStream> GetTetrad3dVisualization(int tetradId);
		Task<Visualization_3d> GetVisualization3D(int id);
		Task<IEnumerable<Visualization_3d>> GetALlVisualization3D();


	}
}