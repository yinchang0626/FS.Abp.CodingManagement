﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using EF Core template.
// 1.221.0.0
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------

using System;
using System.Data;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Common;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;
using FS.Abp.CodingManagement.EntityFrameworkCore;

namespace FS.Abp.CodingManagement.Coding
{
    public partial class CodesConfiguration : IEntityTypeConfiguration<Codes>
    {
        private CodingManagementModelBuilderConfigurationOptions options;
        public CodesConfiguration(CodingManagementModelBuilderConfigurationOptions options)
        {
            this.options = options;
        }
        public void Configure(EntityTypeBuilder<Codes> builder)
        {
            builder.ToTable(options.TablePrefix + @"Codes", options.Schema);
            builder.Property<string>(x => x.No).HasColumnName(@"No").IsRequired().ValueGeneratedNever();
            builder.Property<string>(x => x.DisplayName).HasColumnName(@"DisplayName").IsRequired().ValueGeneratedNever();
            builder.Property<string>(x => x.Description).HasColumnName(@"Description").ValueGeneratedNever();
            builder.Property<string>(x => x.Code).HasColumnName(@"Code").IsRequired().ValueGeneratedNever();
            builder.Property<System.Guid?>(x => x.DefinitionId).HasColumnName(@"DefinitionId").ValueGeneratedNever();
            builder.Property<System.Guid?>(x => x.ParentId).HasColumnName(@"ParentId").ValueGeneratedNever();
            builder.Property<bool>(x => x.Enable).HasColumnName(@"Enable").IsRequired().ValueGeneratedNever().HasDefaultValue(true);
            builder.Property<System.Guid?>(x => x.TenantId).HasColumnName(@"TenantId").ValueGeneratedNever();
            builder.HasKey(@"Id");
            builder.HasMany(x => x.CodeList).WithOne(op => op.Definition).IsRequired(false).HasForeignKey(@"DefinitionId");
            builder.HasOne(x => x.Definition).WithMany(op => op.CodeList).IsRequired(false).HasForeignKey(@"DefinitionId");
            builder.HasMany(x => x.Children).WithOne(op => op.Parent).IsRequired(false).HasForeignKey(@"ParentId");
            builder.HasOne(x => x.Parent).WithMany(op => op.Children).IsRequired(false).HasForeignKey(@"ParentId");

            builder.ConfigureAuditedAggregateRoot();

            CustomizeConfiguration(builder);
        }

        #region Partial Methods

        partial void CustomizeConfiguration(EntityTypeBuilder<Codes> builder);

        #endregion
    }

}
