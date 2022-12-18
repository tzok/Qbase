using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
    public interface ISearchRepository
    {
        Task<List<QuadruplexTable>> GetAllResults(string query);
        Task<List<string>> GetExperimentalMethod();
        Task<List<string>> GetONZ();
        Task<List<string>> GetMoleculeType();
        Task<List<string>> GetWebbaDaSilva();
    }
}
