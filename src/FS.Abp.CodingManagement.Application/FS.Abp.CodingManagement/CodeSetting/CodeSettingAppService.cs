using FS.Abp.CodingManagement.CodeSetting.Dtos;
using FS.Abp.CodingManagement.Coding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Settings;

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

        [Obsolete("replaced by PostLoadCodeSettingsBy")]
        public async Task<List<CodeSettingInput>> PostGetCodeSettingsByCodeId(List<Guid> codeIds)
        {
            List<CodeSettingInput> codeSettingDtos = new List<CodeSettingInput>();
            var codes = this._codeRepository.Where(x => codeIds.Contains(x.Id)).ToList();
            foreach (var code in codes)
            {
                var settings = await this._settingManager.GetAllAsync("Codes", code.Id.ToString());

                CodeSettingInput dto = ObjectMapper.Map<FS.Abp.CodingManagement.Coding.Codes, CodeSettingInput>(code);
                dto.Settings = settings;

                codeSettingDtos.Add(dto);
            }

            return codeSettingDtos;
        }

        public async Task<List<CodeSettingInput>> PostLoadCodeSettingsBy(PostLoadCodeSettingsInputDto inputs)
        {
            List<CodeSettingInput> codeSettingDtos = new List<CodeSettingInput>();
            var codes = getCodeInputs(inputs.CodeIds);
            foreach (var code in codes)
            {
                var settings = await getSettings(code.Id,inputs.SettingKeys);

                CodeSettingInput dto = ObjectMapper.Map<Codes, CodeSettingInput>(code);
                dto.Settings = settings;

                codeSettingDtos.Add(dto);
            }

            return codeSettingDtos;
            List<Codes> getCodeInputs(List<Guid> codeIds)
            {
                var codes = this._codeRepository.Where(x => codeIds.Contains(x.Id)).ToList();
                return codes;
            }
            async Task<List<SettingValue>> getSettings(Guid codeId, List<string> settingKeys)
            {
                var settings = new List<SettingValue>();
                if (settingKeys == null || settingKeys.Count == 0)
                {
                    settings = await this._settingManager.GetAllAsync("Codes", codeId.ToString());
                }
                else 
                {
                    foreach (var settingKey in settingKeys)
                    {
                        var settingValue = await this._settingManager.GetOrNullAsync(settingKey, "Codes", codeId.ToString());
                        var setting = new SettingValue()
                        {
                            Name = settingKey,
                            Value = settingValue
                        };
                        settings.Add(setting);
                    }
                }
                return settings;
            }
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