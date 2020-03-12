using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace FS.Abp.CodingManagement.MongoDB
{
    [ConnectionStringName(CodingManagementDbProperties.ConnectionStringName)]
    public class CodingManagementMongoDbContext : AbpMongoDbContext, ICodingManagementMongoDbContext
    {
        /* Add mongo collections here. Example:
         * public IMongoCollection<Question> Questions => Collection<Question>();
         */

        protected override void CreateModel(IMongoModelBuilder modelBuilder)
        {
            base.CreateModel(modelBuilder);

            modelBuilder.ConfigureCodingManagement();
        }
    }
}