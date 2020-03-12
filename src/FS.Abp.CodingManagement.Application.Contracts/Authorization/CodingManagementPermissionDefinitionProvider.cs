using FS.Abp.CodingManagement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace FS.Abp.CodingManagement.Authorization
{
    public class CodingManagementPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            //var moduleGroup = context.AddGroup(CodingManagementPermissions.GroupName, L("Permission:CodingManagement"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<CodingManagementResource>(name);
        }
    }
}