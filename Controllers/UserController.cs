using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Models;

namespace Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user/")]
    public class UserController : ControllerBase
    {
        private DataCtx dataContx;
        private IJwtAuthenticationManager jwtAuthenticationManager;

        public UserController(DataCtx dataContx, IJwtAuthenticationManager ajwtAuthenticationManage)
        {
            this.dataContx = dataContx;
            this.jwtAuthenticationManager = ajwtAuthenticationManage;            
        }

        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]User userGet)
        {
            if(dataContx.Users.Any(u=> u.Name == userGet.Name)) 
            {
                return StatusCode(300);
            }

            if(dataContx.Users.Any(u=> u.Email == userGet.Email)) 
            {
                return StatusCode(301);
            }
            var token = jwtAuthenticationManager.Authenticate(userGet.Name, userGet.Password);
            if (token == null)
                return Unauthorized();
            User user = new User();
            user.Name = userGet.Name;
            user.Password = userGet.Password;
            user.Email = userGet.Email;
            await dataContx.Users.AddAsync(user);
            await dataContx.SaveChangesAsync();
            user.ID = dataContx.Users.First(x => x.Name == userGet.Name).ID;
            user.Token = token;
            return Ok(user);  
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task <IActionResult> Login([FromBody] User userCredentials)
        {

            var user = await dataContx.Users.FirstOrDefaultAsync(x => (x.Name == userCredentials.Name && x.Password == userCredentials.Password));
            var token = jwtAuthenticationManager.Authenticate(userCredentials.Name, userCredentials.Password);
            if (token == null){
                return StatusCode(303);
            }
            user.Password = "";
            user.Token = token;
            return Ok( user);

        }

        [Authorize]
        [HttpGet("getUsers")]
        public async Task <IActionResult> GetAllUsers()
        {
            var users = await dataContx.Users.ToListAsync();
            return Ok(users);
        }

    }
}