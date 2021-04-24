import {Column,CreateDateColumn,Entity,PrimaryColumn} from "typeorm"; //importado modulo de entidade
import { v4 as uuid } from "uuid"; //importação de tipo v4 de uuid para utiliza-lo logo abaixo

@Entity("users") //para definir entidade users, foi necessario desabilidade função de inicialização do tsconfig para ele não ser responsavel de inicializar a aplicação
class User {
  //criação de classe user
  @PrimaryColumn() //definição de PK
  readonly id: string; //apenas leitura(não pode alterar)
  @Column() //definição de coluna
  name: string;
  @Column()
  email: string;
  @CreateDateColumn() //definição de coluna com formato de data especifica.
  created_at: Date;

  constructor() {
    if (!this.id) {
      //falo que caso o id n exista ele tera o valor de uuid
      this.id = uuid(); //quando for criar um usuario, o id deve ser definido, caso n exista ele usuara um padrão
    }
  }
}

export { User }; //exportação com nome User
