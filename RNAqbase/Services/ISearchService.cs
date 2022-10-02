using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Services
{
    public interface ISearchService
    {
        Task<List<QuadruplexTable>> GetAllResults();
    }
}
