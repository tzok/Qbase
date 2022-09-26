using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class SearchController : Controller
	{
		private readonly ISearchService searchService;

		public SearchController(ISearchService searchService)
		{
			this.searchService = searchService;
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetResults()
		{
			return Ok(await searchService.GetAllResults());
		}

	}
}