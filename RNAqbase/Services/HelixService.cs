using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RNAqbase.Models;
using RNAqbase.Repository;

namespace RNAqbase.Services
{
	public class HelixService : IHelixService
	{
		private readonly IHelixRepository helixRepository;

		public HelixService(IHelixRepository helixRepository)
		{
			this.helixRepository = helixRepository;
		}
		public async Task<List<Helix>> GetAllHelices() =>
			await helixRepository.GetAllHelices();

		public async Task<Helix> GetHelixxById(int id) =>
			await helixRepository.GetHelixById(id);
	}
}
