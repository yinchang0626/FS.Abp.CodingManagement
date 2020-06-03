using System;
using System.Collections.Generic;
using System.Text;

namespace FS.Abp.CodingManagement.Versions
{
    public class BasicVersionInfo
    {
        public Guid? VersionId { get; }

        public string Name { get; }
        public BasicVersionInfo(Guid? versionId, string name = null)
        {
            VersionId = versionId;
            Name = name;
        }

    }
}
