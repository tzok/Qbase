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
	}
}
