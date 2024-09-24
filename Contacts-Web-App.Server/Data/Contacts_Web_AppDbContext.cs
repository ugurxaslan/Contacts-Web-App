using Contacts_Web_App.Server.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System;

namespace Contacts_Web_App.Server.Data
{
    public class Contacts_Web_AppDbContext : DbContext
    {
        public Contacts_Web_AppDbContext(DbContextOptions dbContextOptions):base(dbContextOptions){ }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User-Contact ilişkisini yapılandırma
            modelBuilder.Entity<Contact>()
                .HasOne(c => c.User)
                .WithMany(u => u.Contacts)
                .HasForeignKey(c => c.UserId) 
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
