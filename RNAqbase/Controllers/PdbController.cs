using System;
using System.Text;
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
		public async Task<IActionResult> GetVisualizationById(string pdbId)
		{
			if(pdbId == null) return BadRequest();
			string svg = await repository.GetVisualizationByPdbId(pdbId);
			return base.Ok(svg);
		}
	}
}
