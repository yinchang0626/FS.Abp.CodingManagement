using System;
using System.Collections.Generic;

namespace FS.Abp.CodingManagement.CodeSetting.Dtos
{
    public class PostLoadCodeSettingsInputDto
    {
        public List<Guid> CodeIds { get; set; }
        public List<string> SettingKeys { get; set; }
    }
}