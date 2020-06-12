using FS.Abp.CodingManagement.Coding.Dtos;
using FS.Abp.SettingManagement.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Settings;

namespace FS.Abp.CodingManagement.CodeSetting.Dtos
{
    public class CodesWithSettingsDto
    {
        public CodesDto Codes { get; set; }
        public List<SettingValue> SettingValues { get; set; }
        //public List<string> AvailableSettingsGroups { get; set; }
        public List<SettingDefinitionDto> AvailableSettingsDefinitions { get; set; }

    }
}
