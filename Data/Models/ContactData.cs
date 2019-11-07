using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ContactData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int ContactId { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
