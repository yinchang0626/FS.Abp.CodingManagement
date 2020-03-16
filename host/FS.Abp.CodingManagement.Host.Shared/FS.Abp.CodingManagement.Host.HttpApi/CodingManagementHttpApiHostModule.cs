using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Modularity;

namespace FS.Abp.CodingManagement.Host.HttpApi
{
    [DependsOn(
        typeof(FS.Abp.CodingManagement.CodingManagementApplicationModule),
        typeof(FS.Abp.CodingManagement.CodingManagementHttpApiModule),
        typeof(FS.Abp.CodingManagement.EntityFrameworkCore.CodingManagementEntityFrameworkCoreModule)
        )]
    public class CodingManagementHttpApiHostModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers.Create(typeof(FS.Abp.CodingManagement.CodingManagementApplicationModule).Assembly, action => action.RootPath = "CodingManagement");
            });
        }
    }
}
