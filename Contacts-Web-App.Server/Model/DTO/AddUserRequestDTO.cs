

using Contacts_Web_App.Server.Model.Entity;
using System;

namespace Contacts_Web_App.Server.Model.DTO
{
    public class AddUserRequestDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Encrypted_Password { get; set; }

        public static User objectFromRequestDTO(AddUserRequestDTO dto)
        {
            return new User()
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Surname = dto.Surname,
                Email = dto.Email,
                Encrypted_Password = dto.Encrypted_Password
            };
        }

    }
}
