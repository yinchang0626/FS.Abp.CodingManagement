using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;
using Volo.Abp.SettingManagement;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public class CodeSettingDomainService : ICodeSettingDomainService
    {
        private readonly IGuidGenerator _guidGenerator;
        private readonly FS.Abp.Trees.ITreeRepository<FS.Abp.CodingManagement.Coding.Codes> _codeRepository;
        private readonly ICurrentTenant _currentTenant;
        private readonly ISettingManager _settingManager;

        public CodeSettingDomainService(
            IGuidGenerator guidGenerator,
            ISettingManager settingManager,
            FS.Abp.Trees.ITreeRepository<FS.Abp.CodingManagement.Coding.Codes> codeRepository,
            ICurrentTenant currentTenant)
        {
            this._guidGenerator = guidGenerator;
            this._settingManager = settingManager;
            this._codeRepository = codeRepository;
            this._currentTenant = currentTenant;
        }

        public async Task SetCodeSetting(FS.Abp.CodingManagement.Coding.Codes codes, List<Volo.Abp.Settings.SettingValue> settingValues)
        {
            if (codes.Id == Guid.Empty)
            {
                EntityHelper.TrySetId(codes, () => this._guidGenerator.Create(), true);
                codes.TenantId = this._currentTenant.Id;
                codes = await this._codeRepository.InsertAsync(codes, true).ConfigureAwait(false);
            }
            else
            {
                codes = await this._codeRepository.UpdateAsync(codes).ConfigureAwait(false);
            }

            string providerKey = codes.Id.ToString();
            string providerName = "Codes";
            foreach (var kv in settingValues)
            {
                await this._settingManager.SetAsync(kv.Name, kv.Value, providerName, providerKey).ConfigureAwait(false);
            }
        }

        public async Task DeleteCodeSetting(Guid codeId)
        {
            var generalSettings = await this._settingManager.GetAllAsync("G", "").ConfigureAwait(false);
            var settings = await this._settingManager.GetAllAsync("Codes", codeId.ToString()).ConfigureAwait(false);
            for (var i = 0; i < settings.Count(); i++)
            {
                try
                {
                    //Setting 設為預設值時刪除
                    var gSetting = generalSettings.Find(x => x.Name == settings[i].Name);
                    if (gSetting.Value == settings[i].Value) continue;

                    await this._settingManager.SetAsync(gSetting.Name, gSetting.Value, "Codes", codeId.ToString()).ConfigureAwait(false);
                }
                catch
                {
                    //無法找到 Setting
                }
            }
        }
    }
}