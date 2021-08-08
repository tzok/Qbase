using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class StatisticsController : Controller
	{
		private readonly IStatisticsService statisticsService;

		public StatisticsController(IStatisticsService statisticsService)
		{
			this.statisticsService = statisticsService;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTopologyBaseTetradViewTableOne()
		{
			var a = await statisticsService.GetTopologyBaseTetradViewTableOne();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTopologyBaseTetradViewTableTwo()
		{
			var a = await statisticsService.GetTopologyBaseQuadruplexViewTableTwo();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetTopologyBaseTetradViewTableThere()
		{
			var a = await statisticsService.GetTopologyBaseQuadruplexViewTableThere();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> GetElTetradoTetradViewTableOne()
		{
			var a = await statisticsService.GetElTetradoTetradViewTableOne();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetElTetradoTetradViewTableTwo()
		{
			var a = await statisticsService.GetElTetradoQuadruplexViewTableTwo();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetElTetradoTetradViewTableThereA()
		{
			var a = await statisticsService.GetElTetradoQuadruplexViewTableThereA();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetElTetradoTetradViewTableThereB()
		{
			var a = await statisticsService.GetElTetradoQuadruplexViewTableThereB();
			return Ok(a);
		}
		//Task<HomePagePlot> GetCountOfComponents();
		[HttpGet("[action]")]
		public async Task<IActionResult> GetCount()
		{
			var a = await statisticsService.GetCountOfComponents();
			return Ok(a);
		}

		
		[HttpGet("[action]")]
		public async Task<IActionResult> GetUpdate()
		{
			var a = await statisticsService.GetUpdateInformations();
			
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_o_plus()
		{
			var a = await statisticsService.ion_distribution_o_plus();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_o_minus()
		{
			var a = await statisticsService.ion_distribution_o_minus();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_n_plus()
		{
			var a = await statisticsService.ion_distribution_n_plus();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_n_minus()
		{
			var a = await statisticsService.ion_distribution_n_minus();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_z_plus()
		{
			var a = await statisticsService.ion_distribution_z_plus();
			return Ok(a);
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> ion_distribution_z_minus()
		{
			var a = await statisticsService.ion_distribution_z_minus();
			return Ok(a);
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> gba_da_silva()
		{
			var a = await statisticsService.gba_da_silva();
			return Ok(a);
		}
		[HttpGet("[action]")]
		public async Task<IActionResult> loop_da_silva()
		{
			var a = await statisticsService.loop_da_silva();
			return Ok(a);
		}

	}
}
