using FS.Abp.CodingManagement.Coding.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;

namespace FS.Abp.CodingManagement.Coding
{
    public partial class CodesTreeAppService
    {
        private ICodesService _codesService;
        public ICodesService codesService => this.LazyGetRequiredService(ref _codesService);

        public async Task UpdateListAsync(List<UpdateListInput> input)
        {
            for(var i = 0; i < input.Count(); i++)
            {
                var codes = await this.GetEntityByIdAsync(input[i].Id).ConfigureAwait(false);
                this.MapToEntity(input[i], codes);

                await this._repository.UpdateAsync(codes, false).ConfigureAwait(false);
            }

            
        }

        public async Task<List<FS.Abp.CodingManagement.Coding.Dtos.CodesDto>> FindChildrenAsync(Guid? parentId, bool recursive = false)
        {
            var codes = await this.TreeRepository.FindChildrenAsync(parentId, recursive);

            var result = codes.Select(x => this.MapToDto<CodesDto>(x)).ToList();
            return result;
        }

        public async Task<FS.Abp.CodingManagement.Coding.Dtos.CodesWithDetailsDto> GetDefinitionAsync(string no)
        {
            var codes = await this.codesService.GetDefinitionAsync(no).ConfigureAwait(false);
            var result = this.MapToDto<CodesWithDetailsDto>(codes);
            return result;
        }
    }
    
}
