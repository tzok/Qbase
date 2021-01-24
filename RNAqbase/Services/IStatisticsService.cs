using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Services
{
	public interface IStatisticsService
	{
		Task<List<Statistics>> GetTopologyBaseTetradViewTableOne();
		Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableTwo();
		Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere();
		Task<List<Statistics>> GetElTetradoTetradViewTableOne();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB();
		Task<HomePagePlot>  GetCountOfComponents();
		Task<HomePagePlot> GetUpdateInformations();

	}

}

