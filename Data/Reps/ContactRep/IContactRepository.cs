using System.Threading.Tasks;
using System.Collections.Generic;
using Data.Models;

namespace Data.Reps.ContactRep
{
    public interface IContactRep
    {
        Task<List<dynamic>> GetContactsAsync();
        Task AddContactAsync(string numberPhone, Dictionary<string, string> data);
        Task DeleteContactAsync(int id);
    }
}