using System;
using System.Collections.Generic;
using System.Text;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public class CodeSettingInput : FS.Abp.CodingManagement.Coding.Dtos.CodesDto
    {
        public List<Volo.Abp.Settings.SettingValue> Settings { get; set; }
    }

    public class CreateOrUpdateCodeSettingsInput
    {
        public List<CodeSettingInput> EditItems { get; set; }
        public List<Guid> DeleteItemIds { get; set; }
    }
}
