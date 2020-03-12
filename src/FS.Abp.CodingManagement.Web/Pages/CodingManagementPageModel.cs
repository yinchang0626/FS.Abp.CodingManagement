using FS.Abp.CodingManagement.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace FS.Abp.CodingManagement.Web.Pages
{
    /* Inherit your PageModel classes from this class.
     */
    public abstract class CodingManagementPageModel : AbpPageModel
    {
        protected CodingManagementPageModel()
        {
            LocalizationResourceType = typeof(CodingManagementResource);
            ObjectMapperContext = typeof(CodingManagementWebModule);
        }
    }
}