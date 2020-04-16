using System;
using System.Collections.Generic;

namespace FS.Abp.CodingManagement.CodeSetting.Dtos
{
    public class GetCodeSettingsByCodeIdAndSettingKeysInputDto
    {
        public Guid CodeId { get; set; }
        public List<string> SettingKeys { get; set; }
    }
}