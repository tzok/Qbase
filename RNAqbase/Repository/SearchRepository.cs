using System.Collections.Generic;
using System.Diagnostics;
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
        private readonly string searchScriptPath;

        public SearchRepository(IConfiguration configuration) : base(configuration)
        {
            searchScriptPath = configuration.GetValue<string>("SearchScriptPath");
        }

        public async Task<List<QuadruplexTable>> GetAllResults(string query, Dictionary<string, object> parameters, string keyword)
        {            
            using (var connection = Connection)
            {
                connection.Open();
                if (keyword == "" || keyword.Trim() == "" || keyword.Trim().Length == 0) 
                {
                    return (await connection.QueryAsync<QuadruplexTable>(query, parameters)).ToList();
                }

                Process p = new Process();
                p.StartInfo.FileName = searchScriptPath;
                p.StartInfo.Arguments = keyword;
                p.StartInfo.UseShellExecute = false;
                p.StartInfo.RedirectStandardOutput = true;
                p.Start();
                string output = p.StandardOutput.ReadToEnd();
                p.WaitForExit();
                List<string> pdbIds = output.Trim().Split('\n').ToList();

                return (await connection.QueryAsync<QuadruplexTable>(query, parameters))
                    .Where(quadruplex => pdbIds.Contains(quadruplex.PdbId))
                    .OrderBy(quadruplex =>
                        (pdbIds.IndexOf(quadruplex.PdbId), quadruplex.AssemblyId)
                    ).ToList();
            }
		}

        public async Task<List<string>> GetExperimentalMethod() 
        {            
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT experiment FROM PDB WHERE experiment IS NOT NULL;")).ToList();
            }
        }

        public async Task<List<string>> GetONZ()
        {            
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT onz FROM tetrad WHERE onz IS NOT NULL;")).ToList();
            }
        }
        public async Task<List<string>> GetMoleculeType()
        {         
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT molecule FROM nucleotide WHERE molecule IS NOT NULL;")).ToList();
            }
        }

        public async Task<List<string>> GetWebbaDaSilva()
        {
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT loop_progression FROM quadruplex WHERE loop_progression IS NOT NULL;")).ToList();
            }
        }

        public async Task<List<string>> GetIons()
        {
            using (var connection = Connection)
            {
                connection.Open();
                return (await connection.QueryAsync<string>("SELECT DISTINCT name FROM Ion;")).ToList();
            }
        }
    }
}
