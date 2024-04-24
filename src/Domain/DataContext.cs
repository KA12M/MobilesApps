using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace Domain;

public class DataContext : DbContext
{
    private readonly IConfiguration _configuration;

    public DataContext(DbContextOptions<DataContext> options,IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DbConnection"));
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Sickness> Sicknesses { get; set; }
    public DbSet<UserSickness> UserSicknesses { get; set; }
    public DbSet<Hearing> Hearings { get; set; }
    public DbSet<HearingItem> HearingItems { get; set; }
    public DbSet<Diabetes> Diabetes { get; set; }
    public DbSet<FMHT> FMHTs { get; set; }
    
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
        builder.Entity<User>().HasMany(a => a.FMHTs).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);
        builder.Entity<Hearing>().HasMany(a => a.Items).GetInfrastructure().OnDelete(DeleteBehavior.Cascade);

    }
}
