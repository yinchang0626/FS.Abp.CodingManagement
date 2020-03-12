using JetBrains.Annotations;
using Volo.Abp.MongoDB;

namespace FS.Abp.CodingManagement.MongoDB
{
    public class CodingManagementMongoModelBuilderConfigurationOptions : AbpMongoModelBuilderConfigurationOptions
    {
        public CodingManagementMongoModelBuilderConfigurationOptions(
            [NotNull] string collectionPrefix = "")
            : base(collectionPrefix)
        {
        }
    }
}