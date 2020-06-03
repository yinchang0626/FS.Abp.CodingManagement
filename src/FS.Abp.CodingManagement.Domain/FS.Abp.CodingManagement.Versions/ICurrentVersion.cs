using System;
using System.Collections.Generic;
using System.Text;

namespace FS.Abp.CodingManagement.Versions
{
    public interface ICurrentVersionAccessor
    {
        BasicVersionInfo Current { get; set; }
    }
    public interface ICurrentVersion
    {
        Guid? Id { get; }

        string Name { get; }

        void Change(Guid? id, string name = null);

    }
}
