using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class HelixController : Controller
	{
		private readonly IHelixService helixService;

		public HelixController(IHelixService helixService)
		{
			this.helixService = helixService;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetHelices()
		{
            return Ok(await helixService.GetAllHelices());
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetHelixById(int id)
		{
			if (id == 0) return BadRequest();

			return Ok(await helixService.GetHelixById(id));
		}


	}
}
