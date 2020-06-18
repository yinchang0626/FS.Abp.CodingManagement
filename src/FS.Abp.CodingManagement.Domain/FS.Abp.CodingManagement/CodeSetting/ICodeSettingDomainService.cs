using FS.Abp.CodingManagement.Coding;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FS.Abp.CodingManagement.CodeSetting
{
    public interface ICodeSettingDomainService : Volo.Abp.Domain.Services.IDomainService
    {
        Task SetCodeSetting(FS.Abp.CodingManagement.Coding.Codes codes, List<Volo.Abp.Settings.SettingValue> settingValues);
        Task DeleteCodeSetting(Guid codeId);
        Task TestUpdate(Codes codes);
    }
}
