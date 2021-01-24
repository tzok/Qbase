using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Services
{
	public class EmailService : IEmailService
	{
		private readonly IConfiguration configuration;

		public EmailService(IConfiguration configuration)
		{
			this.configuration = configuration;
		}


		public async Task SendEmail(string subject, string message)
		{
			using (var client = new SmtpClient())
			{
				var credentials = new NetworkCredential
				{
					UserName = configuration["Email:Email"],
					Password = configuration["Email:Password"]
				};

				client.Credentials = credentials;
				client.Host = configuration["Email:Host"];
				client.Port = int.Parse(configuration["Email:Port"]);
				client.EnableSsl = true;

				using (var emailMessage = new MailMessage())
				{
					emailMessage.To.Add(new MailAddress(configuration["Email:Destination"]));
					emailMessage.From = new MailAddress(configuration["Email:Email"]);
					emailMessage.Subject = subject;
					emailMessage.Body = message;

					client.Send(emailMessage);
				}
			}

			await Task.CompletedTask;
		}

	}
}