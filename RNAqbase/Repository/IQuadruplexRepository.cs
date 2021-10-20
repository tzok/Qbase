using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public interface IQuadruplexRepository
	{
		Task<IEnumerable<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId);
		Task<Quadruplex> GetQuadruplexById(int id);
		Task<List<QuadruplexTable>> GetAllQuadruplexes();
		Task<List<Structure>> GetAllStructures(string query);
        Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id);
        Task<MemoryStream> GetQuadruplex3dVisualization(int id);
        Task<IEnumerable<NucleotidesChiValues>> GetNucleotideChiValues(int id);
        Task<IEnumerable<QuadruplexLoops>> GetQuadruplexLoops(int id);
        Task<IEnumerable<Ions>> GetIons(int id);



	}
}
