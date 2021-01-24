using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Services
{
	public class AddEmailService: IAddEmailService
	{
		private readonly IAddEmailRepository addEmailRepository;
		
		public AddEmailService(IAddEmailRepository addEmailRepository)
		{
			this.addEmailRepository = addEmailRepository;
		}
		
		public async Task<string> AddEmailToDatabase(string email) =>
			(await addEmailRepository.AddEmailToDatabase(email));

	}
}
