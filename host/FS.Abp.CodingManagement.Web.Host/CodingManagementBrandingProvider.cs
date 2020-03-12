using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared.Components;
using Volo.Abp.DependencyInjection;

namespace FS.Abp.CodingManagement
{
    [Dependency(ReplaceServices = true)]
    public class CodingManagementBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "CodingManagement";
    }
}
