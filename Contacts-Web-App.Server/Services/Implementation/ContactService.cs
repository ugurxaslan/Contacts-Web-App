using Contacts_Web_App.Server.Data;
using Contacts_Web_App.Server.Model.DTO;
using Contacts_Web_App.Server.Model.Entity;
using Contacts_Web_App.Server.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Contacts_Web_App.Server.Services.implementation
{
    public class ContactService : ContactServiceInterface
    {
        public readonly Contacts_Web_AppDbContext dbContext;
        private readonly ILogger<ContactService> _logger;

        public ContactService(Contacts_Web_AppDbContext dbContext,
                                ILogger<ContactService> logger)
        {
            this.dbContext = dbContext;
            _logger = logger;
        }


        public List<ContactDTO> getAllContact(Guid uid)
        {
            User user = dbContext.Users.Include(user=>user.Contacts).FirstOrDefault(user=>user.Id.Equals(uid));
            if (user != null)
            {
                List<ContactDTO> contactDTOs = new List<ContactDTO>();
                foreach (Contact contact in user.Contacts)
                {
                    contactDTOs.Add(Contact.objectToDTO(contact));
                }
                _logger.LogInformation("succesfull gell all contact: user is {Email}", user.Email);
                return contactDTOs;
            }
            else
            {
                _logger.LogInformation("failed gell all contact: user is not exist {Email}", user.Email);
                return null;
            }
        }

        public ContactDTO addContact(Guid uid, AddContactRequestDTO dto)
        {
            if (dbContext.Users.Any(user=>user.Id==uid))
            {
                Contact contact = AddContactRequestDTO.objectFromRequestDTO(uid,dto);
                User user = dbContext.Users.Include(u => u.Contacts).FirstOrDefault(u => u.Id == uid);
                user.Contacts.Add(contact);

                dbContext.Contacts.Add(contact);
                dbContext.Users.Update(user);
                dbContext.SaveChanges();
                _logger.LogInformation("succesfull add contact: user is {Email}", user.Email);
                return Contact.objectToDTO(contact);
            }
            else
            {
                //return UserNotFoundExcepiton();
                _logger.LogInformation("failed add contact: user is not exist {Email}", dto.Email);
                return null;
            }
        }

        public ContactDTO updateContact(ContactDTO dto)
        {
            Contact contact = dbContext.Contacts.FirstOrDefault(contact => contact.Id == dto.Id);
            if (contact != null)
            {
                contact.Email = dto.Email;
                contact.Phone = dto.Phone;
                contact.Name = dto.Name;
                contact.Surname = dto.Surname;
                dbContext.Contacts.Update(contact);
                dbContext.SaveChanges();
                _logger.LogInformation("succesfull update contact: contact is {Id}", dto.Id);
                return Contact.objectToDTO(contact);
            }
            else
            {
                _logger.LogInformation("failed update contact: contact is not exist {Id}", dto.Id);
                return null;
            }
        }

        public bool deleteContact(Guid contactId)
        {
            Contact contact = dbContext.Contacts.Find(contactId);
            if (contact != null)
            {
                dbContext.Remove(contact);
                dbContext.SaveChanges();
                _logger.LogInformation("succesfull delete contact: contact is {Id}", contactId);
                return true;
            }
            else
            {
                _logger.LogInformation("failed delete contact: contact is not exist {Id}", contactId);
                return false;
            }
        }
    }
}
