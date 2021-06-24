using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Database
{
    public class DataCtx : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Gadgets> Gadgets { get; set; }
        public DataCtx(DbContextOptions<DataCtx> options) : base (options) 
        {
            
        }
    }
}