using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Data.Models;

namespace Data.Reps.ContactRep
{
    public class ContactRep : IContactRep
    {
        private ContactsContext context;

        public ContactRep()
        {
            context = new ContactsContext();
        }




        public async Task<List<dynamic>> GetContactsAsync()
        {
            var resultContacts = new List<dynamic>();
            var contacts = await GetEntityContactsAsync();

            contacts.ForEach(contact => resultContacts.Add(InitDynamicContact(contact)));
            return resultContacts;
        }

        private async Task<List<Contact>> GetEntityContactsAsync() => await context.Contact
            .Include(contact => contact.ContactData)
            .ToListAsync();
        
        private dynamic InitDynamicContact(Contact contact) => new 
            {
                id = contact.Id,
                numberPhone = contact.NumberPhone,
                contactData = InitDynamicContactData(contact.ContactData.ToList())
            };

        private List<dynamic> InitDynamicContactData(List<ContactData> data)
        {
            var dynamicData = new List<dynamic>();
            data.ForEach(item => 
            {
                dynamicData.Add(new 
                {
                    id = item.Id,
                    name = item.Name,
                    value = item.Value
                });
            });
            return dynamicData;
        }




        public async Task AddContactAsync(string numberPhone, Dictionary<string, string> data)
        {
            var contact = InitContact(numberPhone);
            ContactAddData(contact, data);
            await context.AddAsync(contact);
            await context.SaveChangesAsync();
        }

        private Contact InitContact(string numberPhone) => new Contact { NumberPhone = numberPhone };
        
        private void ContactAddData(Contact contact, Dictionary<string, string> data)
        {
            foreach(var item in data)
                contact.ContactData.Add(new ContactData{ Name = item.Key, Value = item.Value });
        }




        public async Task DeleteContactAsync(int id)
        {
            var contact = await context.Contact.FindAsync(id);
            context.Contact.Remove(contact);
            await context.SaveChangesAsync();
        }
    }
}