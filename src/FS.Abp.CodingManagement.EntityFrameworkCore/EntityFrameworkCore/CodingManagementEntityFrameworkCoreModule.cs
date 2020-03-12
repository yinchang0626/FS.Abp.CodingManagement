using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement.EntityFrameworkCore
{
    [DependsOn(
        typeof(CodingManagementDomainModule),
        typeof(AbpEntityFrameworkCoreModule),

        typeof(FS.Abp.Trees.EntityFrameworkCore.TreesEntityFrameworkCoreModule),
        typeof(FS.Abp.SettingManagement.EntityFrameworkCore.SettingManagementEntityFrameworkCoreModule)
    )]
    public class CodingManagementEntityFrameworkCoreModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<CodingManagementDbContext>(options =>
            {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, EfCoreQuestionRepository>();
                 */
            });

            context.Services.AddTreeRepository<CodingManagementDbContext>();
        }
    }
}