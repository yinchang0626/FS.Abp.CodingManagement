using System.Reflection;
using AutoMapper;
using FS.Abp.CodingManagement.Coding.Models;
using Volo.Abp.AutoMapper;

namespace FS.Abp.CodingManagement.Coding.Dtos
{
    public partial class CodesWithSettingsDtoAutoMapperProfile : Profile
    {
        public CodesWithSettingsDtoAutoMapperProfile()
        {
            CreateMap<CodesWithSettings, CodesWithSettingsDto>();
        }
    }

}
