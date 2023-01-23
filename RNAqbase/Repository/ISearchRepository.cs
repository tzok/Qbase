using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
    public interface ISearchRepository
    {
        Task<List<QuadruplexTable>> GetAllResults(string query, Dictionary<string, object> parameters, string keyword);
        Task<List<string>> GetExperimentalMethod();
        Task<List<string>> GetONZ();
        Task<List<string>> GetIons();
        Task<List<string>> GetMoleculeType();
        Task<List<string>> GetWebbaDaSilva();
    }
}
