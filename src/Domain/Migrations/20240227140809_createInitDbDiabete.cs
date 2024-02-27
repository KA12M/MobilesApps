using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class createInitDbDiabete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiabetesItems");

            migrationBuilder.AddColumn<string>(
                name: "ImageEyeLeft",
                table: "Diabetes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageEyeRight",
                table: "Diabetes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResultLeft",
                table: "Diabetes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResultRight",
                table: "Diabetes",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageEyeLeft",
                table: "Diabetes");

            migrationBuilder.DropColumn(
                name: "ImageEyeRight",
                table: "Diabetes");

            migrationBuilder.DropColumn(
                name: "ResultLeft",
                table: "Diabetes");

            migrationBuilder.DropColumn(
                name: "ResultRight",
                table: "Diabetes");

            migrationBuilder.CreateTable(
                name: "DiabetesItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DiabetesId = table.Column<int>(type: "INTEGER", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    Result = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiabetesItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiabetesItems_Diabetes_DiabetesId",
                        column: x => x.DiabetesId,
                        principalTable: "Diabetes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiabetesItems_DiabetesId",
                table: "DiabetesItems",
                column: "DiabetesId");
        }
    }
}
