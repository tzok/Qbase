using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RNAqbase.BackEnd;
using RNAqbase.Models.Search;
using RNAqbase.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
		public async Task<IActionResult> GetResults() //TO DELETE
		{
			List<Filter> filters = new List<Filter>();
			return Ok(await searchService.GetAllResults(filters));
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> PostAndGetResults()
		{
			Request.EnableBuffering();
			Request.Body.Position = 0;
			string rawRequestBody = new StreamReader(Request.Body).ReadToEnd();
			List<Filter> filters;

			try
            {
				filters = JsonConvert.DeserializeObject<List<Filter>>(rawRequestBody, new JsonFilterConverter());
            }
            catch
            {
                return BadRequest();
            }

			if (filters == null)
			{
				return BadRequest();
			}

			return Ok(await searchService.GetAllResults(filters));
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetExperimentalMethod()
		{
			return Ok(await searchService.GetExperimentalMethod());
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetONZ()
		{
			return Ok(await searchService.GetONZ());
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> GetIons()
		{
			return Ok(await searchService.GetIons());
		}
	}
}