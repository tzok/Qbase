using System.Collections.Generic;
using RNAqbase.Models;
using RNAqbase.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public class QuadruplexService : IQuadruplexService
	{
		private readonly ITetradRepository tetradRepository;
		private readonly IQuadruplexRepository quadruplexRepository;

		public QuadruplexService(ITetradRepository tetradRepository, IQuadruplexRepository quadruplexRepository)
		{
			this.tetradRepository = tetradRepository;
			this.quadruplexRepository = quadruplexRepository;
		}

		public async Task<List<Quadruplex>> GetAllQuadruplexes()
		{
			var tetrads = await tetradRepository.FindAll();
			var tetradGroups = tetrads.GroupBy(x => x.QuadruplexId).ToList();
			var quadruplexes = new List<Quadruplex>();

			foreach (var tetradGroup in tetradGroups.Where(tg => tg.Count() > 1))
			{
				quadruplexes.Add(new Quadruplex { TetradReferences = tetradGroup.ToList() });
			}

			return quadruplexes;
		}

		public async Task<Quadruplex> GetQuadruplexById(int id)
		{
			var tetrads = await tetradRepository.FindAllTetradsByQuadruplexId(id);
			return new Quadruplex { TetradReferences = tetrads.ToList() };
		}

		public async Task<List<int>> GetQuadruplexesByPdbId(string pdbId, int quadruplexId)
		{
			var quadruplexes = await quadruplexRepository.GetQuadruplexesByPdbId(pdbId, quadruplexId);
			return quadruplexes.ToList();
		}
	}
}
