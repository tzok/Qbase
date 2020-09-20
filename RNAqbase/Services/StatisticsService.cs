using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Services
{
	public class StatisticsService : IStatisticsService
	{
		private readonly IStatisticsRepository statisticsRepository;

		public StatisticsService(IStatisticsRepository statisticsRepository)
		{
			this.statisticsRepository = statisticsRepository;
		}


		public async Task<List<Statistics>> GetTopologyBaseTetradViewTableOne() =>
			await statisticsRepository.GetTopologyBaseTetradViewTableOne();

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableTwo() =>
			await statisticsRepository.GetTopologyBaseQuadruplexViewTableTwo();

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere() =>
			await statisticsRepository.GetTopologyBaseQuadruplexViewTableThere();

		public async Task<List<Statistics>> GetElTetradoTetradViewTableOne() =>
			await statisticsRepository.GetElTetradoTetradViewTableOne();

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo() =>
			await statisticsRepository.GetElTetradoQuadruplexViewTableTwo();

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA() =>
			await statisticsRepository.GetElTetradoQuadruplexViewTableThereA();

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB() =>
			await statisticsRepository.GetElTetradoQuadruplexViewTableThereB();
	}
}
