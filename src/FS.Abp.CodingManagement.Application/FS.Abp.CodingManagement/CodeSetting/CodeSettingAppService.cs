using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public class CodeSettingAppService : CodingManagementAppService, ICodeSettingAppService
    {
        private readonly FS.Abp.Trees.ITreeRepository<FS.Abp.CodingManagement.Coding.Codes> _codeRepository;
        private readonly Volo.Abp.SettingManagement.ISettingManager _settingManager;
        private readonly ICodeSettingDomainService _codeSettingDomainService;

        public CodeSettingAppService(
            FS.Abp.Trees.ITreeRepository<FS.Abp.CodingManagement.Coding.Codes> codeRepository,
            Volo.Abp.SettingManagement.ISettingManager settingManager,
            ICodeSettingDomainService codeSettingDomainService)
        {
            this._codeRepository = codeRepository;
            this._settingManager = settingManager;
            this._codeSettingDomainService = codeSettingDomainService;
        }

        public async Task<List<CodeSettingInput>> PostGetCodeSettingsByCodeId(List<Guid> codeIds)
        {
            List<CodeSettingInput> codeSettingDtos = new List<CodeSettingInput>();

            for (var i = 0; i < codeIds.Count(); i++)
            {
                var code = await this._codeRepository.GetAsync(codeIds[i]);
                var settings = await this._settingManager.GetAllAsync("Codes", code.Id.ToString());

                CodeSettingInput dto = ObjectMapper.Map<FS.Abp.CodingManagement.Coding.Codes, CodeSettingInput>(code);
                dto.Settings = settings;

                codeSettingDtos.Add(dto);
            }

            return codeSettingDtos;
        }

        public async Task PostCreateOrUpdateCodeSettings(CreateOrUpdateCodeSettingsInput input)
        {
            var delCodes = input.DeleteItemIds;
            for (var i = 0; i < delCodes.Count(); i++)
            {
                await this._codeSettingDomainService.DeleteCodeSetting(delCodes[i]);
                await this._codeRepository.DeleteAsync(delCodes[i], true).ConfigureAwait(false);
            }

            var codeSettingDtos = input.EditItems;
            for (var i = 0; i < codeSettingDtos.Count(); i++)
            {
                FS.Abp.CodingManagement.Coding.Codes codes = new Abp.CodingManagement.Coding.Codes();

                if (codeSettingDtos[i].Id != Guid.Empty)
                    codes = await this._codeRepository.GetAsync(codeSettingDtos[i].Id).ConfigureAwait(false);

                codes = ObjectMapper.Map<CodeSettingInput, FS.Abp.CodingManagement.Coding.Codes>(codeSettingDtos[i], codes);

                await this._codeSettingDomainService.SetCodeSetting(codes, codeSettingDtos[i].Settings);
            }
        }
    }
}
