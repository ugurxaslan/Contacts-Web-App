using Contacts_Web_App.Server.Model.Entity;
using System;

namespace Contacts_Web_App.Server.Model.DTO
{
    public class AddContactRequestDTO
    {
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }

        public static Contact objectFromRequestDTO(Guid uid,AddContactRequestDTO dto)
        {
            return new Contact()
            {
                Name = dto.Name,
                Surname = dto.Surname,
                Email = dto.Email,
                Phone = dto.Phone,
                UserId = uid
            };
        }

    }
}
