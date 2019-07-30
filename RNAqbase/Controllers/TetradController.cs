using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class TetradController : Controller
	{
		private readonly IRepository<Tetrad> repository;

		public TetradController(IConfiguration configuration)
		{
			repository = new TetradRepository(configuration);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTetradById(int id)
		{
			if (id == 0) return BadRequest();

			return Ok(await repository.FindById(id));
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTetrads()
		{
			return Ok(await repository.FindAll());
		}
	}
}