using FS.Abp.CodingManagement.Coding;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement.EntityFrameworkCore
{
    [DependsOn(
        typeof(CodingManagementDomainModule),
        typeof(AbpEntityFrameworkCoreModule),

        typeof(FS.Abp.EntityFrameworkCore.AbpEntityFrameworkCoreModule),
        typeof(FS.Abp.SettingManagement.EntityFrameworkCore.SettingManagementEntityFrameworkCoreModule)
    )]
    public class CodingManagementEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<CodingManagementDbContext>(options =>
            {
                options.AddDefaultRepositories();
            });

            context.Services.AddTreeRepository<CodingManagementDbContext>();
        }

    }
}