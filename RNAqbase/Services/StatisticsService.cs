using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Services
{
	public class StatisticsService : IStatisticsService
	{
		private readonly IStatisticsRepository statisticsRepository;
		private readonly IMemoryCache cache;

		private static readonly MemoryCacheEntryOptions Cache = new MemoryCacheEntryOptions
		{
			AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(12)
		};

		public StatisticsService(IStatisticsRepository statisticsRepository, IMemoryCache cache)
		{
			this.statisticsRepository = statisticsRepository;
			this.cache = cache;
		}

		public async Task<List<Statistics>> GetTopologyBaseTetradViewTableOne()
		{
			if (!cache.TryGetValue(nameof(GetTopologyBaseTetradViewTableOne), out List<Statistics> result))
			{
				result = await statisticsRepository.GetTopologyBaseTetradViewTableOne();

				cache.Set(nameof(GetTopologyBaseTetradViewTableOne), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableTwo()
		{
			if (!cache.TryGetValue(nameof(GetTopologyBaseQuadruplexViewTableTwo), out List<Statistics> result))
			{
				result = await statisticsRepository.GetTopologyBaseQuadruplexViewTableTwo();

				cache.Set(nameof(GetTopologyBaseQuadruplexViewTableTwo), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere()
		{
			if (!cache.TryGetValue(nameof(GetTopologyBaseQuadruplexViewTableThere), out List<Statistics> result))
			{
				result = await statisticsRepository.GetTopologyBaseQuadruplexViewTableThere();

				cache.Set(nameof(GetTopologyBaseQuadruplexViewTableThere), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetElTetradoTetradViewTableOne()
		{
			if (!cache.TryGetValue(nameof(GetElTetradoTetradViewTableOne), out List<Statistics> result))
			{
				result = await statisticsRepository.GetElTetradoTetradViewTableOne();

				cache.Set(nameof(GetElTetradoTetradViewTableOne), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo()
		{
			if (!cache.TryGetValue(nameof(GetElTetradoQuadruplexViewTableTwo), out List<Statistics> result))
			{
				result = await statisticsRepository.GetElTetradoQuadruplexViewTableTwo();

				cache.Set(nameof(GetElTetradoQuadruplexViewTableTwo), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA()
		{
			if (!cache.TryGetValue(nameof(GetElTetradoQuadruplexViewTableThereA), out List<Statistics> result))
			{
				result = await statisticsRepository.GetElTetradoQuadruplexViewTableThereA();

				cache.Set(nameof(GetElTetradoQuadruplexViewTableThereA), result, Cache);
			}

			return result;
		}

		public async Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB()
		{
			if (!cache.TryGetValue(nameof(GetElTetradoQuadruplexViewTableThereB), out List<Statistics> result))
			{
				result = await statisticsRepository.GetElTetradoQuadruplexViewTableThereB();

				cache.Set(nameof(GetElTetradoQuadruplexViewTableThereB), result, Cache);
			}

			return result;
		}
		
		public async Task<HomePagePlot> GetCountOfComponents()
		{
			if (!cache.TryGetValue(nameof(GetCountOfComponents), out HomePagePlot result))
			{
				result = await statisticsRepository.GetCountOfComponents();

				cache.Set(nameof(GetCountOfComponents), result, Cache);
			}

			return result;
		}
		public async Task<HomePagePlot> GetUpdateInformations()
		{
			if (!cache.TryGetValue(nameof(GetUpdateInformations), out HomePagePlot result))
			{
				result = await statisticsRepository.GetUpdateInformations();

				cache.Set(nameof(GetUpdateInformations), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_o_plus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_o_plus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_o_plus();

				cache.Set(nameof(ion_distribution_o_plus), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_o_minus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_o_minus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_o_minus();

				cache.Set(nameof(ion_distribution_o_minus), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_n_plus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_n_plus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_n_plus();

				cache.Set(nameof(ion_distribution_n_plus), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_n_minus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_n_minus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_n_minus();

				cache.Set(nameof(ion_distribution_n_minus), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_z_plus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_z_plus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_z_plus();

				cache.Set(nameof(ion_distribution_z_plus), result, Cache);
			}

			return result;
		}
		
		public async Task<List<Statistics>> ion_distribution_z_minus()
		{
			if (!cache.TryGetValue(nameof(ion_distribution_z_minus), out List<Statistics> result))
			{
				result = await statisticsRepository.ion_distribution_z_minus();

				cache.Set(nameof(ion_distribution_z_minus), result, Cache);
			}
			return result;
		}
		public async Task<List<Statistics>> gba_da_silva()
		{
			if (!cache.TryGetValue(nameof(gba_da_silva), out List<Statistics> result))
			{
				result = await statisticsRepository.gba_da_silva();

				cache.Set(nameof(gba_da_silva), result, Cache);
			}
			return result;
		}
		public async Task<List<Statistics>> loop_da_silva()
		{
			if (!cache.TryGetValue(nameof(loop_da_silva), out List<Statistics> result))
			{
				result = await statisticsRepository.loop_da_silva();

				cache.Set(nameof(loop_da_silva), result, Cache);
			}
			return result;
		}

	}
}
