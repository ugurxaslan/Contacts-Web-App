using Contacts_Web_App.Server.Data;
using Contacts_Web_App.Server.Model.DTO;
using System;
using System.Collections.Generic;

namespace Contacts_Web_App.Server.Services.Interface
{
    public interface ContactServiceInterface
    {

        public ContactDTO addContact(Guid uid, AddContactRequestDTO dto);

        public List<ContactDTO> getAllContact(Guid uid);

        public ContactDTO updateContact(ContactDTO dto);
        
        public  Boolean deleteContact(Guid contactId);

    }
}
