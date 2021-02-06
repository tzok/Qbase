using System.Collections.Generic;
using System.IO;
using RNAqbase.Models;
using RNAqbase.Repository;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RNAqbase.Services
{
	public class QuadruplexService : IQuadruplexService
	{
		private readonly IQuadruplexRepository quadruplexRepository;

		public QuadruplexService(IQuadruplexRepository quadruplexRepository)
		{
			this.quadruplexRepository = quadruplexRepository;
		}

		public async Task<List<QuadruplexesWithoutVisualizations>> GetAllQuadruplexes() =>
			await quadruplexRepository.GetAllQuadruplexes();
		
		public async Task<List<Structure>> GetAllStructures() =>
			await quadruplexRepository.GetAllStructures();

		public async Task<Quadruplex> GetQuadruplexById(int id) =>
			await quadruplexRepository.GetQuadruplexById(id);

		public async Task<List<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId) =>
			(await quadruplexRepository.GetQuadruplexesByPdbId(pdbId, quadruplexId)).ToList();

        public async Task<IEnumerable<Quadruplex>> FindAllQuadruplexInTheHelix(int id) =>
            (await quadruplexRepository.FindAllQuadruplexInTheHelix(id)).ToList();

        public async  Task<MemoryStream> GetQuadruplex3dVisualization(int id) =>
	        (await quadruplexRepository.GetQuadruplex3dVisualization(id));
        
        public async  Task<string> AddEmailToDatabase(string email) =>
	        (await quadruplexRepository.AddEmailToDatabase(email));
        public async  Task<string> DeleteEmailFromDatabase(string id) =>
	        (await quadruplexRepository.DeleteEmailFromDatabase(id));

	}
}
