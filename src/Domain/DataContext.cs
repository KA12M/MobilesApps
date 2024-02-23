
using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Domain;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Sickness> Sicknesses { get; set; }
    public DbSet<UserSickness> UserSicknesses { get; set; }
    public DbSet<Hearing> Hearings { get; set; }
    public DbSet<HearingItem> HearingItems { get; set; }
    public DbSet<Diabetes> Diabetes { get; set; }
    public DbSet<DiabetesItem> DiabetesItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserSickness>()
            .HasKey(us => new { us.UserId, us.SicknessId });

        builder.Entity<UserSickness>()
            .HasOne(us => us.User)
            .WithMany(u => u.UserSicknessList)
            .HasForeignKey(us => us.UserId);

        builder.Entity<UserSickness>()
            .HasOne(us => us.Sickness)
            .WithMany()
            .HasForeignKey(us => us.SicknessId);

        builder.Entity<User>().HasMany(a => a.Hearings).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
        builder.Entity<User>().HasMany(a => a.Diabetes).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
        builder.Entity<Hearing>().HasMany(a => a.Items).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
        builder.Entity<Diabetes>().HasMany(a => a.Items).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
    }
}
