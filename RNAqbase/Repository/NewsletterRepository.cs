using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;


namespace RNAqbase.Repository
{
	public class NewsletterRepository : RepositoryBase, INewsletterRepository
	{
		public NewsletterRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public async Task<Info> AddEmailToDatabase(string email)
		{
			using (var connection = Connection)
			{
				connection.Open();
				var ids = await connection.QueryAsync(
					@"
						INSERT INTO newsletter (email)
                         VALUES (@email)", new {@email = email});
				
				var info = new Info();
				info.Information = "done";
				return info;
			}
		}
		
		public async Task<string> DeleteEmailFromDatabase(string id)
		{
			using (var connection = Connection)
			{
				connection.Open();
				Guid id_uuid = new Guid(id);
				var ids = await connection.QueryAsync(
					@"
					DELETE FROM newsletter
					WHERE id = @id;", new {@id = id_uuid});
			}

			return(null);
		}

		
	}
}