using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class QuadruplexController : Controller
	{
		private readonly QuadruplexService quadruplexService;

		public QuadruplexController(IConfiguration configuration)
		{
			quadruplexService = new QuadruplexService(configuration);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetQuadruplexes()
		{
			return Ok(await quadruplexService.GetAllQuadruplexes());
		}
	}
}