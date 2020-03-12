using System;
using Volo.Abp;
using Volo.Abp.MongoDB;

namespace FS.Abp.CodingManagement.MongoDB
{
    public static class CodingManagementMongoDbContextExtensions
    {
        public static void ConfigureCodingManagement(
            this IMongoModelBuilder builder,
            Action<AbpMongoModelBuilderConfigurationOptions> optionsAction = null)
        {
            Check.NotNull(builder, nameof(builder));

            var options = new CodingManagementMongoModelBuilderConfigurationOptions(
                CodingManagementDbProperties.DbTablePrefix
            );

            optionsAction?.Invoke(options);
        }
    }
}