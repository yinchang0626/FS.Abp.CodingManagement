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

namespace FS.Abp.CodingManagement.Versions.Dtos
{
    public partial class VersionAutoMapperProfile : Profile
    {
        public VersionAutoMapperProfile()
        {
            CreateMap<FS.Abp.CodingManagement.Versions.Version, VersionDto>()
            .ReverseMap();
        
            CreateMap<FS.Abp.CodingManagement.Versions.Version, VersionWithDetailsDto>();
        
            CreateMap<VersionCreateInput, FS.Abp.CodingManagement.Versions.Version>();
        
            CreateMap<VersionUpdateInput, FS.Abp.CodingManagement.Versions.Version>();
        
            CreateMap<VersionUpdateInput, VersionDto.PrimaryKey>();
        
            CustomizeConfiguration();
        }
        partial void CustomizeConfiguration();
    }

}