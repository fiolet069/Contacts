using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Contact
    {
        public Contact()
        {
            ContactData = new HashSet<ContactData>();
        }

        public int Id { get; set; }
        public string NumberPhone { get; set; }

        public virtual ICollection<ContactData> ContactData { get; set; }
    }
}
