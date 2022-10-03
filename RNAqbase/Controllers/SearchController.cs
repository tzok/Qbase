using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
		public async Task<IActionResult> GetResults()
		{
			return Ok(await searchService.GetAllResults());
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> PostAndGetResults()
		{
			Request.EnableBuffering();
			Request.Body.Position = 0;
			string rawRequestBody = new StreamReader(Request.Body).ReadToEnd();
			Condition condition = null;

			try
            {
				condition = JsonConvert.DeserializeObject<Condition>(rawRequestBody);
            }
			catch
			{
				return BadRequest();
			}
			return Ok(await searchService.GetAllResults());
		}
	}
}