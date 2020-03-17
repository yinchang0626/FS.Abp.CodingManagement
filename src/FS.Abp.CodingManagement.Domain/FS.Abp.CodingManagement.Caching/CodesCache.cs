using FS.Abp.CodingManagement.Coding;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Json;
using Volo.Abp.Json.Newtonsoft;
using Volo.Abp.Threading;

namespace FS.Abp.CodingManagement.Caching
{
    [ExposeServices(typeof(NewtonsoftJsonSerializer))]
    public class NewtonsoftJsonSerializer : Volo.Abp.Json.Newtonsoft.NewtonsoftJsonSerializer
    {
        public NewtonsoftJsonSerializer(AbpJsonIsoDateTimeConverter dateTimeConverter) : base(dateTimeConverter)
        {
        }

        protected override JsonSerializerSettings CreateSerializerSettings(bool camelCase = true, bool indented = false)
        {
            var result = base.CreateSerializerSettings(camelCase, indented);
            //todo :option
            result.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
            result.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
            return result;
        }
    }
    [ExposeServices(typeof(Utf8JsonDistributedCacheSerializer))]
    public class Utf8JsonDistributedCacheSerializer : Volo.Abp.Caching.Utf8JsonDistributedCacheSerializer
    {
        public Utf8JsonDistributedCacheSerializer(NewtonsoftJsonSerializer jsonSerializer)
            : base(jsonSerializer)
        {
        }
    }
    [ExposeServices(typeof(CodesCache))]
    public class CodesCache : Volo.Abp.Caching.DistributedCache<Codes>, Volo.Abp.DependencyInjection.ISingletonDependency
    {
        public CodesCache(
            IOptions<AbpDistributedCacheOptions> distributedCacheOption,
            IDistributedCache cache,
            ICancellationTokenProvider cancellationTokenProvider,
            Utf8JsonDistributedCacheSerializer serializer,
            IDistributedCacheKeyNormalizer keyNormalizer) : base(
                distributedCacheOption: distributedCacheOption,
                cache: cache,
                cancellationTokenProvider: cancellationTokenProvider,
                serializer: serializer,
                keyNormalizer: keyNormalizer)
        {

        }
    }
}
