import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1615502140159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "survey_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "number",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys:[//aqui é onde irei referenciar os nomes das FK
            {
                name:"FKUser",//nome da chave
                referencedTableName:"users",//nome da tabela de referencia
                referencedColumnNames:["id"],//nome da coluna referenciada
                columnNames:["user_id"],//onde vai ser a FK nesta migration
                onDelete:"CASCADE",//organiza por cascata a ordem de delete
                onUpdate:"CASCADE"//organiza por cascata a ordem de update
            },
            {
                name:"FKSurveys",//nome da chave
                referencedTableName:"surveys",//nome da tabela de referencia
                referencedColumnNames:["id"],//nome da coluna referenciada
                columnNames:["survey_id"],//onde vai ser a FK nesta migration
                onDelete:"CASCADE",//organiza por cascata a ordem de delete
                onUpdate:"CASCADE"//organiza por cascata a ordem de update
            }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("surveys_users")
  }
}
