using Contacts_Web_App.Server.Model.DTO;
using Contacts_Web_App.Server.Services.implementation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Policy;

namespace Contacts_Web_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        public ContactService Service { get; set; }

        public ContactController(ContactService Service)
        {
            this.Service = Service;
        }

        [HttpDelete]
        [Route("{contactId}")]
        public IActionResult deleteContact([FromRoute] Guid contactId)
        {
            return Ok(Service.deleteContact(contactId));
        }

        [HttpPut]
        public IActionResult updateContact(ContactDTO dto)
        {
            return Ok(Service.updateContact(dto));
        }

        [HttpGet]
        [Route("{uid}")]
        public IActionResult getAllContact([FromRoute] Guid uid)
        {
            List<ContactDTO> contactList = Service.getAllContact(uid);
            return Ok(contactList);
        }

        [HttpPost]
        [Route("{uid}")]
        public IActionResult addContact([FromRoute] Guid uid, [FromBody] AddContactRequestDTO dto)
        {
            return Ok(Service.addContact(uid, dto));
        }
    }
}
    