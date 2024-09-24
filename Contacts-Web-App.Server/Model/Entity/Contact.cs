using Contacts_Web_App.Server.Model.DTO;
using System;

namespace Contacts_Web_App.Server.Model.Entity
{
    public class Contact
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        
        public Guid UserId { get; set; }   

        //Navigation Property
        public User User { get; set; }

        public static ContactDTO objectToDTO(Contact contact)
        {
            return new ContactDTO()
            {
                Id = contact.Id,
                Name = contact.Name,
                Surname = contact.Surname,
                Email = contact.Email,
                Phone = contact.Phone
            };
        }
    }
}
