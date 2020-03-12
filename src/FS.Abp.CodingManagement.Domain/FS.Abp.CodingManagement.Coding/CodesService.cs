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
    }
    public class CodesService : ICodesService
    {
        private readonly IDistributedCache<Codes> _cache;
        private readonly ICodesTreeRepository _codesTreeRepository;
        private readonly ICurrentTenant _currentTenant;

        public CodesService(
            IDistributedCache<Codes> cache,
            ICodesTreeRepository codesTreeRepository,
            ICurrentTenant currentTenant
            )
        {
            _cache = cache;
            _codesTreeRepository = codesTreeRepository;
            _currentTenant = currentTenant;
        }

        public async Task<Codes> GetDefinitionAsync(string definitionNo)
        {
            var currentTenant = _currentTenant.Id.HasValue ? _currentTenant.Id.Value.ToString() : "host";
            var result = await _cache.GetOrAddAsync(
                $"{currentTenant}-{definitionNo}", //Cache key
                async () =>
                {
                    return await _codesTreeRepository.GetDefinitionAsync(definitionNo).ConfigureAwait(false);
                },
                () => new DistributedCacheEntryOptions
                {
                    SlidingExpiration = TimeSpan.FromHours(1)
                }
            );
            return result;
        }
    }
}
