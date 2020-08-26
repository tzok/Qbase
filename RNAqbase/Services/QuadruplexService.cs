using System.Collections.Generic;
using RNAqbase.Models;
using RNAqbase.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public class QuadruplexService : IQuadruplexService
	{
		private readonly IQuadruplexRepository quadruplexRepository;

		public QuadruplexService(IQuadruplexRepository quadruplexRepository)
		{
			this.quadruplexRepository = quadruplexRepository;
		}

		public async Task<List<Quadruplex>> GetAllQuadruplexes() =>
			await quadruplexRepository.GetAllQuadruplexes();

		public async Task<Quadruplex> GetQuadruplexById(int id) =>
			await quadruplexRepository.GetQuadruplexById(id);

		public async Task<List<int>> GetQuadruplexesByPdbId(int pdbId, int quadruplexId) =>
			(await quadruplexRepository.GetQuadruplexesByPdbId(pdbId, quadruplexId)).ToList();
	}
}
