using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
	}
}