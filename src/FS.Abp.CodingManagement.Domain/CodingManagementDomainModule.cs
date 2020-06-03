using FS.Abp.CodingManagement.Coding;
using Volo.Abp.Modularity;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(CodingManagementDomainSharedModule),
        typeof(Volo.Abp.Caching.AbpCachingModule),

        typeof(FS.Abp.Domain.AbpDddDomainModule),
        typeof(FS.Abp.Trees.TreesDomainModule),
        typeof(FS.Abp.SettingManagement.SettingManagementDomainModule)
        )]
    public class CodingManagementDomainModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            //context.Services.AddOtaSettings();
            Configure<AbpSettingOptions>(options =>
            {
                options.ValueProviders.Add<CodesSettingValueProvider>();
            });
            Configure<SettingManagementOptions>(options =>
            {
                options.Providers.Add<CodesSettingManagementProvider>();
            });
        }
    }
}
