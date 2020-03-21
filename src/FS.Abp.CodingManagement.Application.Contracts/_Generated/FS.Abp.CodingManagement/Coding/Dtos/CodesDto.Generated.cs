﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by YinChang.
// 1.221.0.0
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using FS.Abp.Application.Dtos;

namespace FS.Abp.CodingManagement.Coding.Dtos
{
    public partial class CodesDto : Volo.Abp.Application.Dtos.AuditedEntityDto<Guid>, FS.Abp.Trees.Dtos.ITreeDto
    {
        public string No { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public System.Guid? DefinitionId { get; set; }

        public System.Guid? ParentId { get; set; }

        public bool Enable { get; set; }

    }
    public partial class CodesWithDetailsDto : CodesDto
    {
        public List<CodesDto> CodeList { get; set; }

        public CodesDto Definition { get; set; }

        public List<CodesDto> Children { get; set; }

        public CodesDto Parent { get; set; }

    }
    public partial class CodesCreateInput : FS.Abp.Trees.Dtos.ICreateInput
    {
        public string No { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public System.Guid? DefinitionId { get; set; }

        public System.Guid? ParentId { get; set; }

        public bool Enable { get; set; }

    }
    public partial class CodesUpdateInput : FS.Abp.Trees.Dtos.IUpdateInput
    {
        public string No { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Code { get; set; }

        public System.Guid? DefinitionId { get; set; }

        public System.Guid? ParentId { get; set; }

        public bool Enable { get; set; }

    }
    public partial class CodesGetListInput : PagedAndSortedResultRequestDto, FS.Abp.Trees.Dtos.IGetListInput
    {
    }
    public partial class CodesMoveInput : FS.Abp.Trees.Dtos.IMoveInput
    {
        public System.Guid Id { get; set; }

        public System.Guid? NewParentId { get; set; }

    }
}
