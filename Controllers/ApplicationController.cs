using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Models;

namespace Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/application/")]
    public class ApplicationController : ControllerBase
    {
        private DataCtx dataContx;
        private IJwtAuthenticationManager jwtAuthenticationManager;

        public ApplicationController(DataCtx dataContx, IJwtAuthenticationManager ajwtAuthenticationManage)
        {
            this.dataContx = dataContx;
            this.jwtAuthenticationManager = ajwtAuthenticationManage;            
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddApplication([FromBody]Application application) 
        {

            Gadgets g = application.Gadgets;

            var gadget = await dataContx.Gadgets.FirstOrDefaultAsync(x => x.OwnerID == g.OwnerID);
            if(gadget != null)
            {
                return StatusCode(310);
            }
            await dataContx.Gadgets.AddAsync(g);
            await dataContx.Applications.AddAsync(application);
            await dataContx.SaveChangesAsync();
            return Ok(g);
        }

        [Authorize]
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetApplication(int id)
        {
            List<Application> payments = await dataContx.Applications.Where(x => x.ID == id).ToListAsync();
            return Ok(payments);
        }

        [Authorize]
        [HttpGet("get")]
        public async Task<IActionResult> GetApplications()
        {
            List<Application> payments = await dataContx.Applications.ToListAsync();
            return Ok(payments);
        }

        [Authorize]
        [HttpGet("gadgets/{id}")]
        public async Task<IActionResult> GetGadgets(int id)
        {
            Gadgets gadgets = await dataContx.Gadgets.Where(x => x.OwnerID == id).FirstAsync();
            return Ok(gadgets);
        }


        
    }
}