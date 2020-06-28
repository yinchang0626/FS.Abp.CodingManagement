﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using EF Core template.
// 1.290.0.0
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

namespace FS.Abp.CodingManagement.Versions
{
    public partial class VersionConfiguration : IEntityTypeConfiguration<Version>
    {
        private CodingManagementModelBuilderConfigurationOptions options;
        public VersionConfiguration(CodingManagementModelBuilderConfigurationOptions options)
        {
            this.options = options;
        }
        public void Configure(EntityTypeBuilder<Version> builder)
        {
            builder.ToTable(options.TablePrefix + @"Versions", options.Schema);
            builder.Property<string>(x => x.ProviderName).HasColumnName(@"ProviderName").ValueGeneratedNever();
            builder.Property<string>(x => x.ProviderKey).HasColumnName(@"ProviderKey").ValueGeneratedNever();
            builder.Property<string>(x => x.Description).HasColumnName(@"Description").ValueGeneratedNever();
            builder.Property<System.Guid?>(x => x.TenantId).HasColumnName(@"TenantId").ValueGeneratedNever();
            builder.HasKey(@"Id");

            builder.ConfigureFullAuditedAggregateRoot();

            CustomizeConfiguration(builder);
        }

        #region Partial Methods

        partial void CustomizeConfiguration(EntityTypeBuilder<Version> builder);

        #endregion
    }

}
