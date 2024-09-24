    using Contacts_Web_App.Server.Model.Entity;
using System;

namespace Contacts_Web_App.Server.Model.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}
