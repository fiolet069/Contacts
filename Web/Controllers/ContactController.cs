using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Reps.ContactRep;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private IContactRep contactRep;

        public ContactController(IContactRep contactRep)
        {
            this.contactRep = contactRep;
        }




        [HttpGet]
        public async Task<JsonResult> Get() => Json(await contactRep.GetContactsAsync());




        [HttpPut]
        public async Task<JsonResult> Put(string numberPhone, Dictionary<string, string> data)
        {
            var (ok, errors) = ValidateData(numberPhone, data);
            if(ok) await contactRep.AddContactAsync(numberPhone, data);
            return ReturnJsonResult(ok, errors);
        }

        private JsonResult ReturnJsonResult(bool ok, List<string> errors) => Json(new { ok, errors });
        
        private (bool, List<string>) ValidateData(string numberPhone, Dictionary<string, string> data)
        {
            var ok = true;
            var errors = new List<string>();

            CheckField("Number phone", numberPhone);
            foreach(var item in data) 
                CheckField(item.Key, item.Value);

            return (ok, errors);

            void CheckField(string name, string value)
            {
                if(string.IsNullOrWhiteSpace(value))
                {
                    ok = false;
                    errors.Add($"Field \"{name}\" is empty");
                }
            }
        }




        [HttpDelete]
        public async Task Delete(int id) => await contactRep.DeleteContactAsync(id);
    }
}