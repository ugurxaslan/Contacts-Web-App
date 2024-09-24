using Contacts_Web_App.Server.Model.DTO;
using Contacts_Web_App.Server.Services.Implementation;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Contacts_Web_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly UserService service;
        public UserController(UserService service)
        {
            this.service = service;
        }

        [HttpPost]
        public IActionResult addUser(AddUserRequestDTO dto)
        {
            return Ok(service.addUser(dto));
        } 

        [HttpGet]
        [Route("{uid}")]
        public IActionResult getUser([FromRoute] Guid uid)
        {
            return Ok(service.getUser(uid));
        }

        [HttpDelete]
        [Route("{uid}")]
        public IActionResult deleteUser([FromRoute] Guid uid)
        {
            return Ok(service.deleteUser(uid));
        }

        [HttpPut]
        [Route("{uid}")]
        public IActionResult updateUser([FromRoute] Guid uid ,[FromBody]AddUserRequestDTO dto)
        {
            return Ok(service.updateUser(uid,dto));
        }

        [HttpPost]
        [Route("login")]
        public IActionResult login([FromBody] LoginRequestDTO dto)
        {
            return Ok(service.login(dto));
        }

    }
}
