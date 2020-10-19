using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Repository;

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
        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetQuadruplex3dVisualizationMethod(int quadruplexId)
        {
	        var dataStream = await quadruplexService.GetQuadruplex3dVisualization(quadruplexId);
	        //https://social.msdn.microsoft.com/Forums/en-US/c2532732-e70b-403e-8f73-34356a6be93e/serialize-a-list-to-memorystream?forum=csharpgeneral
	        return File(dataStream,  "application/octet-stream", $"{quadruplexId}.cif");
        }
        
    }
}