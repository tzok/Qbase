using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Repository;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class AddEmailController: Controller
	{
		private readonly IAddEmailService addEmailService;

		public AddEmailController(IAddEmailService addEmailService)
		{
			this.addEmailService = addEmailService;
		}
		
		[HttpGet("[action]")]
		public async Task<IActionResult> AddEmailToDatabase(string email)
		{
			var a = await addEmailService.AddEmailToDatabase(email);
			return Ok(a);
		}
		
	}
}

