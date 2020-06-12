using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using Volo.Abp.Application;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(CodingManagementDomainModule),
        typeof(CodingManagementApplicationContractsModule),
        typeof(FS.Abp.Application.AbpDddApplicationModule),//typeof(AbpDddApplicationModule),
        typeof(AbpAutoMapperModule),

        typeof(FS.Abp.SettingManagement.SettingManagementApplicationModule)
        )]
    public class CodingManagementApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAutoMapperObjectMapper<CodingManagementApplicationModule>();
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<CodingManagementApplicationModule>(validate: false);
            });
        }
    }
}
