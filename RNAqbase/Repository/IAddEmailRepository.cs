using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
    public interface IAddEmailRepository
    {
        Task<string> AddEmailToDatabase(string email);
    }
}