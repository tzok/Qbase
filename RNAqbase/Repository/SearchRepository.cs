using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using RNAqbase.Models;
using RNAqbase.Models.Search;

namespace RNAqbase.Repository
{
    public class SearchRepository : RepositoryBase, ISearchRepository
    {
        public SearchRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<QuadruplexTable>> GetAllResults(string query)
        {
            using (SshClient)
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<QuadruplexTable>(query)).ToList();
            }
		}

        public async Task<List<string>> GetExperimentalMethod() 
        {
            using (SshClient)
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT experiment FROM PDB;")).ToList();
            }
        }

        public async Task<List<string>> GetONZ()
        {
            using (SshClient)
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT onz FROM tetrad;")).ToList();
            }
        }
        public async Task<List<string>> GetMoleculeType()
        {
            using (SshClient)
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT molecule FROM nucleotide;")).ToList();
            }
        }

        public async Task<List<string>> GetWebbaDaSilva()
        {
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT loop_progression FROM quadruplex;")).ToList();
            }
        }
    }
}
