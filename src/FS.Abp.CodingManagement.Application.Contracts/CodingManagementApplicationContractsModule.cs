using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;
using Volo.Abp.Authorization;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(CodingManagementDomainSharedModule),
        typeof(FS.Abp.Application.AbpDddApplicationContractsModule),//typeof(AbpDddApplicationContractsModule),
        typeof(AbpAuthorizationModule),

        typeof(FS.Abp.SettingManagement.SettingManagementApplicationContractsModule)
        )]
    public class CodingManagementApplicationContractsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<CodingManagementApplicationContractsModule>("FS.Abp.CodingManagement");
            });
        }
    }
}
