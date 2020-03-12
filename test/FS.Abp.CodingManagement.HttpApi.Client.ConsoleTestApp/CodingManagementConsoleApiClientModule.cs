using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement
{
    [DependsOn(
        typeof(CodingManagementHttpApiClientModule),
        typeof(AbpHttpClientIdentityModelModule)
        )]
    public class CodingManagementConsoleApiClientModule : AbpModule
    {
        
    }
}
