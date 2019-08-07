using System.Threading.Tasks;

namespace RNAqbase.Services
{
	public interface IEmailService
	{
		Task SendEmail(string subject, string message);
	}
}
