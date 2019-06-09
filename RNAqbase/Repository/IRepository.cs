using System.Collections.Generic;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public interface IRepository<T> where T : BaseEntity
	{
		Task<T> FindById(int id);
		Task<IEnumerable<T>> FindAll();
	}
}