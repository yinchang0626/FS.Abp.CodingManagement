﻿//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using the template for generating Repositories and a Unit of Work for EF Core model.
// 1.201.0.0
//
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FS.Abp.CodingManagement.Coding
{
    public partial interface ICodesTreeRepository
    {
        public Task<Codes> GetDefinitionAsync(string definitionNo);
    }
}