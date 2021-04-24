import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys")
class Survey {
  //criação de classe user
  @PrimaryColumn() //definição de PK
  readonly id: string; //apenas leitura(não pode alterar) AQUI PODE SER PK OU FK, VER DENTRO DA MIGRATION

  @Column() //definição de coluna
  title: string;

  @Column()
  description: string;

  @CreateDateColumn() //definição de coluna com formato de data especifica.
  created_at: Date;

  constructor() {
    if (!this.id) {
      //falo que caso o id n exista ele tera o valor de uuid
      this.id = uuid(); //quando for criar um usuario, o id deve ser definido, caso n exista ele usuara um padrão
    }
  }
}

export { Survey };

