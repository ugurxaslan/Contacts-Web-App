using Contacts_Web_App.Server.Data;
using Contacts_Web_App.Server.Model.DTO;
using Contacts_Web_App.Server.Model.Entity;
using Contacts_Web_App.Server.Services.implementation;
using Contacts_Web_App.Server.Services.Interface;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace Contacts_Web_App.Server.Services.Implementation
{
    public class UserService: UserServiceInterface
    {
        public Contacts_Web_AppDbContext dbContext { get; set; }
        private readonly ILogger<UserService> _logger;

        public UserService(Contacts_Web_AppDbContext dbContext,
                            ILogger<UserService> logger)    
        {
            this.dbContext = dbContext;
            _logger = logger;
        }

        public UserDTO getUser(Guid uid)
        {
            User user = dbContext.Users.FirstOrDefault(user => user.Id == uid);
            if (user != null)
            {
                _logger.LogInformation("succesfull get user: {Email}", user.Email);
                return User.objectToDTO(user);
            }
            else
            {
                _logger.LogInformation("failed get user: user is not exist {Email}", user.Email);
                return null;
            }
        }

        public UserDTO addUser(AddUserRequestDTO dto)
        {
            if (!dbContext.Users.Any(user=>user.Email == dto.Email))
            {
                User user = AddUserRequestDTO.objectFromRequestDTO(dto);

                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                _logger.LogInformation("succesfull add user: {Email}", user.Email);
                return User.objectToDTO(user);
            }
            else
            {
                //return UserAlreadyExistsException;
                _logger.LogInformation("failed add user: user is already exist {Email}", dto.Email);
                return null;
            }
        }

        public UserDTO updateUser(Guid uid,AddUserRequestDTO dto) 
        {
            
            User users = dbContext.Users.FirstOrDefault(user => user.Email == dto.Email && user.Id != uid);
            if(users != null)
            {
                _logger.LogInformation("failed update user: Email address already in use. {Email}", dto.Email);
                return null;
            }
            User user = dbContext.Users.FirstOrDefault(user => user.Id == uid);

            if (user!=null)
            {
                user.Name = dto.Name ?? user.Name;
                user.Surname = dto.Surname ?? user.Surname;
                user.Encrypted_Password = dto.Encrypted_Password ?? user.Encrypted_Password;
                user.Email = dto.Email ?? user.Email;

                dbContext.Users.Update(user);
                dbContext.SaveChanges();

                _logger.LogInformation("succesfull update user: {Email}", user.Email);
                return User.objectToDTO(user);
            }
            else
            {
                //return UserNotFoundException 
                _logger.LogInformation("failed update user: user is not exist {Email}", user.Email);
                return null ;
            }
        }

        public Boolean deleteUser(Guid uid)
        {
            User user = dbContext.Users.FirstOrDefault(user => user.Id == uid);
            if (user != null)
            {
                dbContext.Users.Remove(user);
                dbContext.SaveChanges();
                _logger.LogInformation("succesfull delete user: {Email}", user.Email);
                return true;
            }
            else
            {
                //kullanıcı yok
                _logger.LogInformation("failed delete user: user is not exist {Email}", user.Email);
                return false;
            }
        }

        public UserDTO login(LoginRequestDTO dto)
        {
            User user = dbContext.Users.FirstOrDefault(user=> user.Email == dto.Email);
            if (user != null)
            {
                if (user.Encrypted_Password == dto.Password)
                {
                    _logger.LogInformation("succesfull login: {Email}", user.Email);
                    return User.objectToDTO(user);
                }
                //hatali şifre
                else
                {
                    _logger.LogInformation("failed login: password is wrong {Email}",user.Email);
                    return null;
                }
            }
            else
            {
                //kullanıcı yok
                _logger.LogInformation("failed login: user is not exist {Email}", dto.Email);
                return null;
            }
        }
    }
}
