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

        public async Task<List<CodeSettingInput>> PostGetCodeSettingsByCodeIdAndSettingKeys(List<GetCodeSettingsByCodeIdAndSettingKeysInputDto> inputs)
        {
            List<CodeSettingInput> codeSettingDtos = new List<CodeSettingInput>();
            var codeInputs = getCodeInputs(inputs);
            foreach (var codeInput in codeInputs)
            {
                var settings = await getSettings(codeInput.input);

                CodeSettingInput dto = ObjectMapper.Map<Codes, CodeSettingInput>(codeInput.code);
                dto.Settings = settings;

                codeSettingDtos.Add(dto);
            }

            return codeSettingDtos;
            List<(GetCodeSettingsByCodeIdAndSettingKeysInputDto input, Codes code)> getCodeInputs(List<GetCodeSettingsByCodeIdAndSettingKeysInputDto> inputs)
            {
                var codeIds = inputs.Select(x => x.CodeId).ToList();
                var codes = this._codeRepository.Where(x => codeIds.Contains(x.Id)).ToList();
                var codeInputs = inputs.Join(codes,
                    input => input.CodeId,
                    code => code.Id,
                    (input, code) => (input, code))
                    .ToList();
                return codeInputs;
            }
            async Task<List<SettingValue>> getSettings(GetCodeSettingsByCodeIdAndSettingKeysInputDto input)
            {
                var settings = new List<SettingValue>();
                foreach (var settingKey in input.SettingKeys)
                {
                    var settingValue = await this._settingManager.GetOrNullAsync(settingKey, "Codes", input.CodeId.ToString());
                    var setting = new SettingValue()
                    {
                        Name = settingKey,
                        Value = settingValue
                    };
                    settings.Add(setting);
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