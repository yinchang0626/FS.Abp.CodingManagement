using FS.Abp.CodingManagement.CodeSetting;
using FS.Abp.CodingManagement.Coding.Dtos;
using FS.Abp.CodingManagement.Coding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Guids;

namespace FS.Abp.CodingManagement.Coding
{
    //todo:rename to CodesAppService
    //todo:definitionNo params change to url
    //todo:Cache
    [RemoteService(false)]
    public partial class CodesTreeAppService
    {
        //private ICodesService _codesService;
        //public ICodesService codesService => this.LazyGetRequiredService(ref _codesService);

        //private IGuidGenerator _guidGenerator;
        //public IGuidGenerator guidGenerator => this.LazyGetRequiredService(ref _guidGenerator);

        //private ICodesStore _codesStore;
        //public ICodesStore codesStore => this.LazyGetRequiredService(ref _codesStore);

        //private ICodeSettingDomainService _codeSettingDomainService;

        //public ICodeSettingDomainService codeSettingDomainService => this.LazyGetRequiredService(ref _codeSettingDomainService);

        //public async Task CreateListAsync(List<CodesCreateInput> input)
        //{
        //    for(var i = 0; i < input.Count(); i++)
        //    {
        //        await this.CreateAsync(input[i]);
        //    }
        //}

        //public async Task UpdateListAsync(List<UpdateListInput> input)
        //{
        //    for(var i = 0; i < input.Count(); i++)
        //    {
        //        var codes = await this.GetEntityByIdAsync(input[i].Id).ConfigureAwait(false);
        //        this.MapToEntity(input[i], codes);

        //        await this._repository.UpdateAsync(codes, false).ConfigureAwait(false);
        //    }


        //}

        //public async Task<List<CodesDto>> PostFindChildrenAsync(Guid? parentId, bool recursive = false)
        //{
        //    var codes = await this.TreeRepository.FindChildrenAsync(parentId, recursive);

        //    var result = codes.Select(x => this.MapToDto<CodesDto>(x)).ToList();
        //    return result;
        //}

        //public async Task<List<CodesWithSettingsDto>> GetDefinitionsAsync()
        //{
        //    var models = await this.codesStore.GetDefinitionsAsync().ConfigureAwait(false);
        //    var result = ObjectMapper.Map<List<CodesWithSettings>, List<CodesWithSettingsDto>>(models);
        //    return result;
        //}
        //public async Task<List<CodesWithSettingsDto>> GetFindByAsync(FindByDefinitionNoInput findBy)
        //{
        //    return null;
        //    //var models= await this.codesStore.GetDefinitionAsync(findBy.DefinitionNo).ConfigureAwait(false);
        //    //var result = ObjectMapper.Map<List<CodesWithSettings>, List<CodesWithSettingsDto>>(models);
        //    //return result;
        //}
        

        //public async Task DeleteClearDefinitionCacheAsync(string no)
        //{
        //    await this.codesService.ClearCacheAsync(no).ConfigureAwait(false);
        //}
    }
    //public class FindByDefinitionNoInput
    //{
    //    public List<string> DefinitionNo { get; set; }
    //}

}
