using System;
using System.Data;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Data;
using Newtonsoft.Json;

namespace FS.Abp.CodingManagement.Coding
{
    public partial class Codes 
    {
        [JsonProperty("Id")]
        private Guid _jsonId
        {
            get { return this.Id; }
            set { this.Id = value; }
        }
    }

}
