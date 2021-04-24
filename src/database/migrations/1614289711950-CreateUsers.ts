import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614289711950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      //aqui estou rodando o codigo de createtable para dar up da table
      new Table({
        name: "users", //aqui é o primeiro termo, nome da tabela
        columns: [
          //aqui se define as colunas
          {
            name: "id", //estrura de : nome da coluna, tipo da coluna, demais elementos
            type: "uuid",
            isPrimary: true, //aqui no caso foi falado que seria uma coluna como PK
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //nesta função ela é tem como objetivo o down da table ou seja o drop
    await queryRunner.dropTable("users"); //caso necessario escrevi um codigo para que seja dropado a table "users"
  }
}
