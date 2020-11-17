using RNAqbase.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RNAqbase.Services
{
	public interface IQuadruplexService
	{
		Task<List<QuadruplexesWithoutVisualizations>> GetAllQuadruplexes();
		Task<Quadruplex> GetQuadruplexById(int id);
		Task<List<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId);
        Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id);
        Task<MemoryStream> GetQuadruplex3dVisualization(int quadruplexId);
        
	}
}
