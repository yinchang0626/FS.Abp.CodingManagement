using FS.Abp.CodingManagement.Coding;
using EasyAbp.Abp.Trees;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement.EntityFrameworkCore
{
    [DependsOn(
        typeof(CodingManagementDomainModule),
        typeof(AbpEntityFrameworkCoreModule),
        typeof(EasyAbp.Abp.Trees.EntityFrameworkCore.AbpTreesEntityFrameworkCoreModule),

        typeof(FS.Abp.EntityFrameworkCore.AbpEntityFrameworkCoreModule),
        typeof(FS.Abp.SettingManagement.EntityFrameworkCore.SettingManagementEntityFrameworkCoreModule)
    )]
    public class CodingManagementEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {

            var t = typeof(IEntity).IsAssignableFrom(typeof(Codes));
            context.Services.AddAbpDbContext<CodingManagementDbContext>(options =>
            {
                //options.AddRepository<FS.Abp.Trees.ITreeRepository<Codes>, EfCoreCodesTreeRepository>();
                options.AddDefaultRepositories();
            });
            context.Services.AddTreeRepository<CodingManagementDbContext>();
            //context.Services.AddTreeRepository<CodingManagementDbContext>();
        }

    }
}