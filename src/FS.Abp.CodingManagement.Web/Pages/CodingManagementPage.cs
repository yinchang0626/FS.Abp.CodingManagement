using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using FS.Abp.CodingManagement.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace FS.Abp.CodingManagement.Web.Pages
{
    /* Inherit your UI Pages from this class. To do that, add this line to your Pages (.cshtml files under the Page folder):
     * @inherits FS.Abp.CodingManagement.Web.Pages.CodingManagementPage
     */
    public abstract class CodingManagementPage : AbpPage
    {
        [RazorInject]
        public IHtmlLocalizer<CodingManagementResource> L { get; set; }
    }
}
