using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Repository
{
    public interface INewsletterRepository
    {
        Task<string> AddEmailToDatabase(string email);
        Task<string> DeleteEmailFromDatabase(string id);
    }
}