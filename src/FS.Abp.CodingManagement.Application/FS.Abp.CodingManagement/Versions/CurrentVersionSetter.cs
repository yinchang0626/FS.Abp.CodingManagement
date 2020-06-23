using FS.Abp.CodingManagement.Versions;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities;

namespace FS.Abp.CodingManagement.Versions
{
    public class CurrentVersionSetter : Volo.Abp.DependencyInjection.ITransientDependency
    {
        private readonly ICurrentVersion currentVersion;

        public CurrentVersionSetter(
            FS.Abp.CodingManagement.Versions.ICurrentVersion currentVersion
            )
        {
            this.currentVersion = currentVersion;
        }
        public void TryToSetVersionId(IEntity entity)
        {
            if (entity is IMultiVersion)
            {
                var versionId = currentVersion.Id;

                if (!versionId.HasValue)
                {
                    return;
                }

                var propertyInfo = entity.GetType().GetProperty(nameof(IMultiVersion.VersionId));

                if (propertyInfo == null || propertyInfo.GetSetMethod(true) == null)
                {
                    return;
                }

                propertyInfo.SetValue(entity, versionId);
            }
        }
    }
}
