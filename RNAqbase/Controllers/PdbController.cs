using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class PdbController : Controller
	{
		private readonly PdbRepository repository;

		public PdbController(IConfiguration configuration)
		{
			repository = new PdbRepository(configuration);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetVisualizationById(int pdbId)
		{
			if(pdbId == 0) return BadRequest();
			string svg = await repository.GetVisualizationByPdbId(pdbId);
			return base.Ok(svg);
		}
	}
}
