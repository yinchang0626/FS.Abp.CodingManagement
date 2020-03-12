using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace FS.Abp.CodingManagement.EntityFrameworkCore
{
    public class CodingManagementHttpApiHostMigrationsDbContext : AbpDbContext<CodingManagementHttpApiHostMigrationsDbContext>
    {
        public CodingManagementHttpApiHostMigrationsDbContext(DbContextOptions<CodingManagementHttpApiHostMigrationsDbContext> options)
            : base(options)
        {
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ConfigureCodingManagement();
        }
    }
}
