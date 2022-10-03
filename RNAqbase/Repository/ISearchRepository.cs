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
    }
}
