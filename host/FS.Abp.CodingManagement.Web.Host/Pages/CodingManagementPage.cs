using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using FS.Abp.CodingManagement.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace FS.Abp.CodingManagement.Pages
{
    public abstract class CodingManagementPage : AbpPage
    {
        [RazorInject]
        public IHtmlLocalizer<CodingManagementResource> L { get; set; }
    }
}
