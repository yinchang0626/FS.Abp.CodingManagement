﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by YinChang.
// 1.221.0.0
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------
using Volo.Abp.Reflection;

namespace FS.Abp.CodingManagement.Core
{
    public class CorePermissionNames
    {
        public const string GroupName = "FS.Abp.CodingManagement.Core";

        public static class Coding
        {
            public const string Default = GroupName + ".Coding";
            public const string DevelopPage = Default + ".DevelopPage";
        }

        public static string[] GetAll()
        {
            return ReflectionHelper.GetPublicConstantsRecursively(typeof(CorePermissionNames));
        }
    }
}
