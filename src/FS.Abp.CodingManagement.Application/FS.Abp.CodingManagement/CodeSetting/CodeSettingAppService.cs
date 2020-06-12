using FS.Abp.CodingManagement.CodeSetting.Dtos;
using FS.Abp.CodingManagement.Coding;
using FS.Abp.CodingManagement.Coding.Dtos;
using FS.Abp.CodingManagement.Coding.Models;
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
        private readonly ICodesStore _codesStore;
        private readonly Volo.Abp.SettingManagement.ISettingManager _settingManager;
        private readonly ICodeSettingDomainService _codeSettingDomainService;

        public CodeSettingAppService(
            FS.Abp.Trees.ITreeRepository<FS.Abp.CodingManagement.Coding.Codes> codeRepository,
            ICodesStore codesStore,
            Volo.Abp.SettingManagement.ISettingManager settingManager,
            ICodeSettingDomainService codeSettingDomainService)
        {
            this._codeRepository = codeRepository;
            this._codesStore = codesStore;
            this._settingManager = settingManager;
            this._codeSettingDomainService = codeSettingDomainService;
        }

        [Obsolete("replaced by GetFindByAsync")]
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
        [Obsolete("replaced by GetFindByAsync")]
        public async Task<List<CodeSettingOutput>> PostLoadCodeSettingsBy(PostLoadCodeSettingsInputDto inputs)
        {
            List<CodeSettingOutput> codeSettingDtos = new List<CodeSettingOutput>();
            var codes = getCodeInputs(inputs.CodeIds);
            foreach (var code in codes)
            {
                var settings = await getSettings(code.Id,inputs.SettingKeys);

                CodeSettingOutput dto = ObjectMapper.Map<Codes, CodeSettingOutput>(code);
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
        [Obsolete("replaced by PostDispatch")]
        public async Task PostCreateOrUpdateCodeSettings(CreateOrUpdateCodeSettingsInput input)
        {
            await this.PostDispatch(input).ConfigureAwait(false);
        }

        public async Task PostDispatch(CreateOrUpdateCodeSettingsInput input)
        {
            var delCodes = input.DeleteItemIds;
            for (var i = 0; i < delCodes.Count(); i++)
            {
                await this._codeSettingDomainService.DeleteCodeSetting(delCodes[i]);
                await this._codeRepository.DeleteAsync(delCodes[i]).ConfigureAwait(false);
            }

            var codeSettingDtos = input.EditItems;
            for (var i = 0; i < codeSettingDtos.Count(); i++)
            {
                Codes codes = new Codes();

                if (codeSettingDtos[i].Id != Guid.Empty)
                    codes = await this._codeRepository.GetAsync(codeSettingDtos[i].Id).ConfigureAwait(false);

                codes = ObjectMapper.Map(codeSettingDtos[i], codes);

                await this._codeSettingDomainService.SetCodeSetting(codes, codeSettingDtos[i].Settings);
            }
        }

        public async Task<List<CodesWithSettingsDto>> GetDefinitionsAsync()
        {
            var models = await this._codesStore.GetDefinitionsAsync().ConfigureAwait(false);
            var result = ObjectMapper.Map<List<CodesWithSettings>, List<CodesWithSettingsDto>>(models);
            return result;
        }
        public async Task<List<CodesWithSettingsDto>> PostFindByDefinitionNosAsync(FindByDefinitionNosInput input)
        {
            var result = new List<CodesWithSettingsDto>();
            foreach (var no in input.DefinitionNos)
            {
                var model = await this._codesStore.GetDefinitionAsync(no).ConfigureAwait(false);
                result = result.Concat(ObjectMapper.Map<List<CodesWithSettings>, List<CodesWithSettingsDto>>(model)).ToList();
            }
            return result;
        }

    }
}