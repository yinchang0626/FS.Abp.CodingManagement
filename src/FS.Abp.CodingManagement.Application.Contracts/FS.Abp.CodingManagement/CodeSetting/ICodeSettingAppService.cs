using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public interface ICodeSettingAppService
    {
        Task<List<CodeSettingInput>> PostGetCodeSettingsByCodeId(List<Guid> codeIds);
        Task PostCreateOrUpdateCodeSettings(CreateOrUpdateCodeSettingsInput input);
    }
}
