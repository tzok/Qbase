using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class QuadruplexController : Controller
	{
		private readonly IQuadruplexService quadruplexService;

		public QuadruplexController(IQuadruplexService quadruplexService)
		{
			this.quadruplexService = quadruplexService;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetQuadruplexes()
		{
			return Ok(await quadruplexService.GetAllQuadruplexes());
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetQuadruplexById(int id)
		{
			if (id == 0) return BadRequest();

			return Ok(await quadruplexService.GetQuadruplexById(id));
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetQuadruplexesByPdbId(int pdbId, int quadruplexId)
		{
			if (pdbId == 0 || quadruplexId == 0) return BadRequest();
			return Ok(await quadruplexService.GetQuadruplexesByPdbId(pdbId, quadruplexId));
		}

        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetListOfQuadruplex(int id)
        {
            if (id == 0) return BadRequest();
            return Ok(await quadruplexService.FindAllQuadruplexInTheHelix(id));
        }
        
    }
}