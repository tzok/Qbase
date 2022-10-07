using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;
using RNAqbase.Models.Search;

namespace RNAqbase.Services
{
    public interface ISearchService
    {
        Task<List<QuadruplexTable>> GetAllResults(List<Filter> filters);
    }
}
