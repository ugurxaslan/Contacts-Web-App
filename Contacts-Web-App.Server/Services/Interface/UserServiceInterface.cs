using Contacts_Web_App.Server.Model.DTO;
using System;

namespace Contacts_Web_App.Server.Services.Interface
{
    public interface UserServiceInterface
    {
        public UserDTO addUser(AddUserRequestDTO dto);
        public Boolean deleteUser(Guid uid);
        public UserDTO updateUser(Guid uid, AddUserRequestDTO dto);
        public UserDTO getUser(Guid uid);
        public UserDTO login(LoginRequestDTO dto);
    }
}
