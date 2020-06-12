using Volo.Abp.Modularity;
using Volo.Abp.Localization;
using FS.Abp.CodingManagement.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Validation;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(AbpValidationModule),

        typeof(FS.Abp.SettingManagement.SettingManagementDomainSharedModule)
    )]
    public class CodingManagementDomainSharedModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.AddEmbedded<CodingManagementDomainSharedModule>("FS.Abp.CodingManagement");
            });

            Configure<AbpLocalizationOptions>(options =>
            {
                options.Resources
                    .Add<CodingManagementResource>("en")
                    .AddBaseTypes(typeof(AbpValidationResource))
                    .AddVirtualJson("/Localization/CodingManagement");
            });

            Configure<AbpExceptionLocalizationOptions>(options =>
            {
                options.MapCodeNamespace("CodingManagement", typeof(CodingManagementResource));
            });
        }
    }
}
