using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class TetradReferenceController : Controller
	{
		private readonly IRepository<TetradReference> repository;

		public TetradReferenceController(IConfiguration configuration)
		{
			repository = new TetradReferenceRepository(configuration);
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