using AlcoStack.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Data
{
    public class AppDataContext : IdentityDbContext<User>
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<User>()
                .HasOne(u => u.Address)
                .WithOne()
                .HasForeignKey<Address>(up => up.UserName)
                .OnDelete(DeleteBehavior.Cascade);
            
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
