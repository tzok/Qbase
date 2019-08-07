using RNAqbase.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public interface IQuadruplexService
	{
		Task<List<Quadruplex>> GetAllQuadruplexes();
	}
}
