using System;
using System.Collections.Generic;
using System.Text;

namespace FS.Abp.CodingManagement.Versions
{
    public interface IMultiVersion
    {
        Guid? VersionId { get; set; }
    }
}
