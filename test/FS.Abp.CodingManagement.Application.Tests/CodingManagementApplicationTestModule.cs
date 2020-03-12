using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(CodingManagementApplicationModule),
        typeof(CodingManagementDomainTestModule)
        )]
    public class CodingManagementApplicationTestModule : AbpModule
    {

    }
}
