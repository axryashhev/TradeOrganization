namespace Metro_CC.data;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DbSet<Product> products { get; set; }
    public DbSet<Category> categories { get; set; }
    public DbSet<Tag> tags { get; set; }
    
    public DataContext()
    {
    }

    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (!options.IsConfigured)
        {
            options.UseNpgsql("Host=localhost;Port=5432;Database=metroCC;Username=artemhrasev;Password=''");
        }
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
    }
}