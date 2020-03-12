using FS.Abp.CodingManagement.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace FS.Abp.CodingManagement.Pages
{
    public abstract class CodingManagementPageModel : AbpPageModel
    {
        protected CodingManagementPageModel()
        {
            LocalizationResourceType = typeof(CodingManagementResource);
        }
    }
}