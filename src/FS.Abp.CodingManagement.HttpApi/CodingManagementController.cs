using FS.Abp.CodingManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace FS.Abp.CodingManagement
{
    public abstract class CodingManagementController : AbpController
    {
        protected CodingManagementController()
        {
            LocalizationResource = typeof(CodingManagementResource);
        }
    }
}
