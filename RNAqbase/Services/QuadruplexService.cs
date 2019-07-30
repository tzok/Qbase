using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public class QuadruplexService
	{
		private readonly IRepository<Tetrad> repository;

		public QuadruplexService(IConfiguration configuration)
		{
			repository = new TetradRepository(configuration);
		}

		public async Task<List<Quadruplex>> GetAllQuadruplexes()
		{
			var tetrads = await repository.FindAll();
			var tetradGroups = tetrads.GroupBy(x => x.QuadruplexId).ToList();
			var quadruplexes = new List<Quadruplex>();

			foreach (var tetradGroup in tetradGroups)
			{
				quadruplexes.Add(new Quadruplex { TetradReferences = tetradGroup.ToList() });
			}

			return quadruplexes;
		}
	}
}
