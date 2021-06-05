using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Repository;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class NewsletterController : Controller
	{
		private readonly INewsletterRepository repository;

		public NewsletterController(INewsletterRepository repository)
		{
			this.repository = repository;
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> AddEmailToDatabase(string email)
		{
			return Ok(await repository.AddEmailToDatabase(email));
		}

		[HttpGet("[action]")]
		public async Task<IActionResult> DeleteEmailFromDatabase(string id)
		{
			return Ok(await repository.DeleteEmailFromDatabase(id));
		}
		
	}
}