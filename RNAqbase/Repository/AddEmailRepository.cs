using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
    public class AddEmailRepository: RepositoryBase, IAddEmailRepository
    {
        public AddEmailRepository(IConfiguration configuration) : base(configuration)
        {
        }
        public async Task<string> AddEmailToDatabase(string email)
        {
            using (var connection = Connection)
            {
                connection.Open();
				
                var ids = await connection.QueryAsync<int>(
                    @"
					INSERT INTO email (email)
                          VALUES (@email)", new {@email = email});


                return ("DONE");
				
            }
        }
    }
}

