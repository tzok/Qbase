using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
	public interface IHelixRepository
	{
		Task<Helix> GetHelixById(int id);
		Task<List<Helix>> GetAllHelices();
        Task<HelixReference> GetHelixReferenceById(int id);
        Task<MemoryStream> GetHelix3dVisualization(int id);


    }
}
