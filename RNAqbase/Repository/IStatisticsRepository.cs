using System.Collections.Generic;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public interface IStatisticsRepository
	{
		Task<List<Statistics>> GetTopologyBaseTetradViewTableOne();
		Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableTwo();
		Task<List<Statistics>> GetTopologyBaseQuadruplexViewTableThere();
		Task<List<Statistics>> GetElTetradoTetradViewTableOne();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableTwo();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereA();
		Task<List<Statistics>> GetElTetradoQuadruplexViewTableThereB();
		Task<HomePagePlot> GetCountOfComponents();
		Task<HomePagePlot> GetUpdateInformations();
		Task<List<Statistics>> ion_distribution_o_plus();
		Task<List<Statistics>> ion_distribution_o_minus();
		Task<List<Statistics>> ion_distribution_n_plus();
		Task<List<Statistics>> ion_distribution_n_minus();
		Task<List<Statistics>> ion_distribution_z_plus();
		Task<List<Statistics>> ion_distribution_z_minus();
		Task<List<Statistics>> gba_da_silva();
		Task<List<Statistics>> loop_da_silva();
		Task<List<Statistics>> experimental_method();
		Task<List<Statistics>> loop_progression_da_silva();
		Task<List<Statistics>> onzm();


	}
}
