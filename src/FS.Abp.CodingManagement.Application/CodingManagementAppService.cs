using FS.Abp.CodingManagement.Localization;
using Volo.Abp.Application.Services;

namespace FS.Abp.CodingManagement
{
    public abstract class CodingManagementAppService : ApplicationService
    {
        protected CodingManagementAppService()
        {
            LocalizationResource = typeof(CodingManagementResource);
            ObjectMapperContext = typeof(CodingManagementApplicationModule);
        }
    }
}
