﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using the template for generating AbpSettings.
// 1.221.0.0
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Localization;
using Volo.Abp.Options;
using Volo.Abp.Settings;
using Volo.Abp.Threading;
using FS.Abp.Shared;
using FS.Abp.Settings;
using FS.Abp.CodingManagement.Localization;


namespace FS.Abp.CodingManagement.Versions
{
    public partial class CodingManagementSettingNames
    {
        public partial class Versions
        {
            private const string Prefix = "FS.Abp.CodingManagement.Versions.Versions";
            public const string CurrentVersion = Prefix + ".CurrentVersion";
        }
    }
    public partial class VersionsSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            context.Add(
                        new SettingDefinition(CodingManagementSettingNames.Versions.CurrentVersion, @"", L("DisplayName:Versions.CurrentVersion"), L("Description:Versions.CurrentVersion"), false).WithProperty("Type","String")
                        );
        }
        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<CodingManagementResource>(name);
        }
    }
    public partial interface IVersionsFactory : IFactory<Versions>, ITransientDependency { }
    public partial class VersionsFactory : Factory<Versions>, IVersionsFactory
    {
        public VersionsFactory(
            ISettingProvider settingProvider)
            : base(settingProvider)
        {
        }

        protected override async Task CreateAsync(Versions options)
        {
            options.CurrentVersion = await _settingProvider.GetOrNullAsync(CodingManagementSettingNames.Versions.CurrentVersion);
        }
    }
}