using Microsoft.EntityFrameworkCore.Migrations;

namespace FS.Abp.CodingManagement.Migrations
{
    public partial class add_enable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Enable",
                table: "CodingManagementCodes",
                nullable: false,
                defaultValueSql: "1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Enable",
                table: "CodingManagementCodes");
        }
    }
}
