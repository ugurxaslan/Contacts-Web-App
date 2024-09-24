using Contacts_Web_App.Server.Model.DTO;
using System;
using System.Collections.Generic;

namespace Contacts_Web_App.Server.Model.Entity
{
    public class User
    {
        
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Encrypted_Password { get; set; }

        //Navigation property
        public List<Contact> Contacts { get; set; }

        //method

        public static UserDTO objectToDTO(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email
            };
        }
    }
}
