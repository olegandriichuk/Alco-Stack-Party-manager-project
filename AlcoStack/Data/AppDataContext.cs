﻿using AlcoStack.Models;
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
        
        // public DbSet<Address> Addresses { get; set; }
        public DbSet<Alcohol> Alcohols { get; set; }
        public DbSet<Party> Parties { get; set; }
        
        public DbSet<UserParty> UserParties { get; set; }
        
        public DbSet<UserAlcohol> UserAlcohols { get; set; }
        
        public DbSet<PartyAlcohol> PartyAlcohols { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();
            
            modelBuilder.Entity<User>()
                .Property(u => u.UserName)
                .HasMaxLength(256); 

            modelBuilder.Entity<User>()
                .HasOne(u => u.Address)
                .WithOne(a => a.User)
                .HasForeignKey<Address>(a => a.UserName)
                .HasPrincipalKey<User>(u => u.UserName)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.CreatedParties)
                .WithOne(p => p.Creator)
                .HasForeignKey(p => p.CreatorUserName)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<UserParty>()
                .HasKey(up => new { up.UserName, up.PartyId });

            modelBuilder.Entity<UserParty>()
                .HasOne(up => up.User)
                .WithMany(u => u.Parties)
                .HasForeignKey(up => up.UserName)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<UserParty>()
                .HasOne(up => up.Party)
                .WithMany(p => p.Users)
                .HasForeignKey(up => up.PartyId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserAlcohol>()
                .HasKey(ua => new { ua.UserName, ua.AlcoholId });

            modelBuilder.Entity<UserAlcohol>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.Alcohols)
                .HasForeignKey(ua => ua.UserName)
                .OnDelete(DeleteBehavior.Restrict); // Change to Restrict

            modelBuilder.Entity<UserAlcohol>()
                .HasOne(ua => ua.Alcohol)
                .WithMany(a => a.Users)
                .HasForeignKey(ua => ua.AlcoholId)
                .OnDelete(DeleteBehavior.Restrict); // Change to Restrict

            modelBuilder.Entity<PartyAlcohol>()
                .HasKey(pa => new { pa.PartyId, pa.AlcoholId });

            modelBuilder.Entity<PartyAlcohol>()
                .HasOne(pa => pa.Party)
                .WithMany(p => p.Alcohols)
                .HasForeignKey(pa => pa.PartyId)
                .OnDelete(DeleteBehavior.Restrict); // Change to Restrict

            modelBuilder.Entity<PartyAlcohol>()
                .HasOne(pa => pa.Alcohol)
                .WithMany(a => a.Parties)
                .HasForeignKey(pa => pa.AlcoholId)
                .OnDelete(DeleteBehavior.Restrict); // Change to Restrict

            // Seed roles
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
