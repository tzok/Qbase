using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RNAqbase.Services;
using System;
using System.Collections.Generic;
using System.IO;
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

		[HttpPost("[action]")]
		public async Task<IActionResult> PostAndGetResults()
		{
			byte[] buffer = new byte[1024];
			var json = Request.Body.Read(buffer, 1, 100);
			//Stream req = Request.Body;
			//req.Seek(0, SeekOrigin.Begin);
			//string json = new StreamReader(req).ReadToEnd();
			string input = System.Text.Encoding.UTF8.GetString(buffer);
			try
			{
				input = JsonConvert.DeserializeObject<string>(System.Text.Encoding.UTF8.GetString(buffer));
			}
			catch
			{
				return BadRequest();
			}
			return Ok(await searchService.GetAllResults());
		}

	}
}