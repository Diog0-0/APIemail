import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {
  //criação de classe user
  @PrimaryColumn() //definição de PK
  readonly id: string; //apenas leitura(não pode alterar)

  @Column()
  user_id: string;

  @ManyToOne(() => User)// n -> 1 (cardinalidade no server)
  @JoinColumn({name: "user_id"})//busca as demais informações da table que possui a FK "user_id"
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(()=> Survey)// n -> 1 (cardinalidade no server)
  @JoinColumn({name: "survey_id"})//busca as demais informações da table que possui a FK "survey_id"
  survey: Survey;

  @Column()
  value: string;

  @CreateDateColumn() //definição de coluna com formato de data especifica.
  created_at: Date;

  constructor() {
    if (!this.id) {
      //falo que caso o id n exista ele tera o valor de uuid
      this.id = uuid(); //quando for criar um usuario, o id deve ser definido, caso n exista ele usuara um padrão
    }
  }
}

export { SurveyUser };

