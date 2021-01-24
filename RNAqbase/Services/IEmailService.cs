using RNAqbase.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
namespace RNAqbase.Services
{
	public interface IEmailService
	{
		Task SendEmail(string subject, string message);
	}
	
}
