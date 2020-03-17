using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;

namespace FS.Abp.CodingManagement.Coding
{
    public interface ICodesService : ITransientDependency
    {
        Task<Codes> GetDefinitionAsync(string definitionNo);
        Task ClearCacheAsync(string definitionNo);
    }
    public class CodesService : ICodesService
    {
        private readonly IDistributedCache<Codes> _cache;
        private readonly ICodesTreeRepository _codesTreeRepository;
        private readonly ICurrentTenant _currentTenant;

        public CodesService(
            FS.Abp.CodingManagement.Caching.CodesCache cache,
            ICodesTreeRepository codesTreeRepository,
            ICurrentTenant currentTenant
            )
        {
            _cache = cache;
            _codesTreeRepository = codesTreeRepository;
            _currentTenant = currentTenant;
        }
        private string GetCacheKey(string definitionNo)
        {

            var currentTenant = _currentTenant.Id.HasValue ? _currentTenant.Id.Value.ToString() : "host";
            return $"{currentTenant}-{definitionNo}";
        }

        public async Task<Codes> GetDefinitionAsync(string definitionNo)
        {
            var currentTenant = _currentTenant.Id.HasValue ? _currentTenant.Id.Value.ToString() : "host";
            var result = await _cache.GetOrAddAsync(
                GetCacheKey(definitionNo),
                async () =>
                {
                    return await _codesTreeRepository.GetDefinitionAsync(definitionNo).ConfigureAwait(false);
                },
                () => new DistributedCacheEntryOptions
                {
                    SlidingExpiration = TimeSpan.FromHours(1)
                }
            ).ConfigureAwait(false);
            return result;
        }
        public async Task ClearCacheAsync(string definitionNo)
        {
            var currentTenant = _currentTenant.Id.HasValue ? _currentTenant.Id.Value.ToString() : "host";
            await _cache.RemoveAsync(GetCacheKey(definitionNo)).ConfigureAwait(false);
        }
    }
}
