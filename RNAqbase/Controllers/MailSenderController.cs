using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RNAqbase.Services;

namespace RNAqbase.Controllers
{
	[Route("api/[controller]")]
	public class MailSenderController : Controller
	{
		private readonly IEmailService emailService;

		public MailSenderController(IEmailService emailService)
		{
			this.emailService = emailService;
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> SendEmail([FromBody]Email data)
		{
			await emailService.SendEmail(data.subject, data.message);

			return Ok();
		}

		public class Email
		{
			public string subject { get; set; }
			public string message { get; set; }
		}
	}
}
