using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class TetradController : Controller
	{
		private readonly ITetradRepository repository;

		public TetradController(ITetradRepository repository)
		{
			this.repository = repository;
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

		[HttpGet("[action]")]
		public async Task<IActionResult> GetOtherTetradsInTheSameQuadruplex(int tetradId, int quadruplexId)
		{
			if (tetradId == 0 || quadruplexId == 0) return BadRequest();

			return Ok(await repository.GetOtherTetradsInTheSameQuadruplex(tetradId, quadruplexId));
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetOtherTetradsInTheSamePdb(int tetradId, string pdbId)
		{
			if (tetradId == 0 || string.IsNullOrWhiteSpace(pdbId)) return BadRequest();

			return Ok(await repository.GetOtherTetradsInTheSamePdb(tetradId, pdbId));
		}


	}
}