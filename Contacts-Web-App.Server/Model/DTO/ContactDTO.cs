using Contacts_Web_App.Server.Model.Entity;
using System;

namespace Contacts_Web_App.Server.Model.DTO
{
    public class ContactDTO
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
    }
}
