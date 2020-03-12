using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Json;
using Volo.Abp.Json.Newtonsoft;

namespace FS.Abp.CodingManagement.Caching
{
    //todo:do not replace IJsonSerializer,that will change others modules
    public interface INewtonsoftJsonSerializer: IJsonSerializer, ITransientDependency
    {
    }
    public class NewtonsoftJsonSerializer : Volo.Abp.Json.Newtonsoft.NewtonsoftJsonSerializer, INewtonsoftJsonSerializer
    {
        public NewtonsoftJsonSerializer(AbpJsonIsoDateTimeConverter dateTimeConverter) : base(dateTimeConverter)
        {
        }

        protected override JsonSerializerSettings CreateSerializerSettings(bool camelCase = true, bool indented = false)
        {
            var result= base.CreateSerializerSettings(camelCase, indented);
            //todo :option
            result.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
            result.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
            return result;
        }
    }
}
