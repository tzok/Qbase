using RNAqbase.Models;
using RNAqbase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.Services
{ 
    public class SearchService
    {
        private readonly SearchRepository searchRepository;

        public SearchService(SearchRepository searchRepository)
        {
            this.searchRepository = searchRepository;
        }

        public string GetTest()
        {
            return searchRepository.GetTest();
        }
    }

   
}
