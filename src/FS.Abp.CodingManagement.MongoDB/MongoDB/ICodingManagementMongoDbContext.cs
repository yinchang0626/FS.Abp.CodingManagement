using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace FS.Abp.CodingManagement.MongoDB
{
    [ConnectionStringName(CodingManagementDbProperties.ConnectionStringName)]
    public interface ICodingManagementMongoDbContext : IAbpMongoDbContext
    {
        /* Define mongo collections here. Example:
         * IMongoCollection<Question> Questions { get; }
         */
    }
}
