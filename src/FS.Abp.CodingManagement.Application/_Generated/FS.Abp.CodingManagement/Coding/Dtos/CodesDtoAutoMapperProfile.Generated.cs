﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by YinChang.
// 1.221.0.0
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------
using System.Reflection;
using AutoMapper;
using Volo.Abp.AutoMapper;

namespace FS.Abp.CodingManagement.Coding.Dtos
{
    public partial class CodesAutoMapperProfile : Profile
    {
        public CodesAutoMapperProfile()
        {
            CreateMap<FS.Abp.CodingManagement.Coding.Codes, CodesDto>()
            .ReverseMap();
        
            CreateMap<FS.Abp.CodingManagement.Coding.Codes, CodesWithDetailsDto>()
            .ReverseMap();
        
            CreateMap<CodesCreateInput, FS.Abp.CodingManagement.Coding.Codes>();
        
            CreateMap<CodesUpdateInput, FS.Abp.CodingManagement.Coding.Codes>();
        
            CustomizeConfiguration();
        }
        partial void CustomizeConfiguration();
    }

}
