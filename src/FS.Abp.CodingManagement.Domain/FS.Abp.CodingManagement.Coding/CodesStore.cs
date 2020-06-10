using FS.Abp.CodingManagement.Coding.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;

namespace FS.Abp.CodingManagement.Coding
{
    public interface ICodesStore
    {
        Task<List<CodesWithSettings>> GetDefinitionAsync(string definitionNo);
        Task<List<CodesWithSettings>> GetDefinitionsAsync();
    }

    public class CodesStore : ITransientDependency, ICodesStore
    {
        private readonly ISettingDefinitionManager _settingDefinitionManager;
        private readonly ISettingManagementStore _settingManagementStore;
        private readonly ICodesTreeRepository _codesTreeRepository;
        
        public CodesStore(
            ISettingDefinitionManager settingDefinitionManager,
            ISettingManagementStore settingManagementStore,
            ICodesTreeRepository codesTreeRepository
            )
        {
            this._settingDefinitionManager = settingDefinitionManager;
            this._settingManagementStore = settingManagementStore;
            this._codesTreeRepository = codesTreeRepository;
        }
        private async Task<List<CodesWithSettings>> transToCodesWithSettingsAsync(IList<Codes> codesList)
        {
            var result = new List<Models.CodesWithSettings>();
            foreach (var codes in codesList)
            {
                var settings = await _settingManagementStore.GetListAsync(CodesSettingValueProvider.ProviderName, codes.Id.ToString()).ConfigureAwait(false);
                result.Add(new Models.CodesWithSettings(_settingDefinitionManager) { Codes = codes, SettingValues = settings });
            }
            return result;
        }
        public async Task<List<Models.CodesWithSettings>> GetDefinitionAsync(string definitionNo)
        {
            var result = new List<Models.CodesWithSettings>();
            var definition = await this._codesTreeRepository.GetDefinitionAsync(definitionNo).ConfigureAwait(false);
            return await transToCodesWithSettingsAsync(definition.CodeList).ConfigureAwait(false);
        }
        public async Task<List<Models.CodesWithSettings>> GetDefinitionsAsync()
        {
            var result = new List<Models.CodesWithSettings>();
            var definitions = await this._codesTreeRepository.GetDefinitionsAsync().ConfigureAwait(false);
            return await transToCodesWithSettingsAsync(definitions).ConfigureAwait(false);
        }

    }
}
