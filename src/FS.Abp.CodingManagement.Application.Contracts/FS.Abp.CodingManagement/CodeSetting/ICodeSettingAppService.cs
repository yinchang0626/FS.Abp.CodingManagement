using FS.Abp.CodingManagement.CodeSetting.Dtos;
using FS.Abp.CodingManagement.Coding.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public interface ICodeSettingAppService
    {
        [Obsolete("replaced by GetFindByAsync")]
        Task<List<CodeSettingInput>> PostGetCodeSettingsByCodeId(List<Guid> codeIds);
        [Obsolete("replaced by GetFindByAsync")]
        Task<List<CodeSettingOutput>> PostLoadCodeSettingsBy(PostLoadCodeSettingsInputDto inputs);
        [Obsolete("replaced by PostDispatch")]
        Task PostCreateOrUpdateCodeSettings(CreateOrUpdateCodeSettingsInput input);

        Task PostPatch(CreateOrUpdateCodeSettingsInput input);
        Task<List<CodesWithSettingsDto>> GetDefinitionsAsync();
        Task<Dictionary<string, List<CodesWithSettingsDto>>> PostFindByDefinitionNosAsync(FindByDefinitionNosInput input);
    }
}
