using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class TetradeController : Controller
	{
		private readonly IRepository<Tetrad> repository;

		public TetradeController(IConfiguration configuration)
		{
			repository = new TetradeRepository(configuration);
		}

		[HttpGet("[action]")]
		public async Task<IEnumerable<Tetrad>> GetTetrades()
		{
			return await repository.FindAll();
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTetradeById(int id)
		{
			if (id == 0) return BadRequest();
			var a = await repository.FindById(id);

			return Ok(a);
		}
	}
}