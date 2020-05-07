using AutoMapper;

namespace FS.Abp.CodingManagement
{
    public class CodingManagementApplicationAutoMapperProfile : Profile
    {
        public CodingManagementApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<FS.Abp.CodingManagement.Coding.Codes, CodeSetting.CodeSettingInput>();
            CreateMap<CodeSetting.CodeSettingInput, FS.Abp.CodingManagement.Coding.Codes>();

            CreateMap<FS.Abp.CodingManagement.Coding.Codes, CodeSetting.CodeSettingOutput>();
            CreateMap<CodeSetting.CodeSettingOutput, FS.Abp.CodingManagement.Coding.Codes>();
        }
    }
}