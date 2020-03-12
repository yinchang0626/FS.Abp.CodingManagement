using Volo.Abp.Reflection;

namespace FS.Abp.CodingManagement.Authorization
{
    public class CodingManagementPermissions
    {
        public const string GroupName = "CodingManagement";

        public static string[] GetAll()
        {
            return ReflectionHelper.GetPublicConstantsRecursively(typeof(CodingManagementPermissions));
        }
    }
}