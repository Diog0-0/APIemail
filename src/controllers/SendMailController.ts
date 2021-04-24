import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRespository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }

    const survey = await surveysRepository.findOne({ id: survey_id});

    if (!survey) {
        return res.status(400).json({
          error: "Survey does not exists!",
        });
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL //aqui chamo a variavel de ambiente do meu arquivo .env e chamo a variavel -> url_mail (pesquisar como o node acha o arquivo .env)
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); //crio um path no caminho do meu arqui hbs ->1
    //trouxe o npsPath para o controller, pois a modificação ira permitir que o MailService se torne generico(ou seja para varios caminhos e n somente 1)


    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({//aqui buscasmos os valores userid e  value null e se encontrados são armazenados na const
      where:[{user_id: user.id}, {value : null}],
      relations: ["user", "survey"]//cria o laço de relação entre o user e o survey, assim atraves da busca pelo id ele ira retornar a resposta no json o total da table.
    });

    if(surveyUserAlreadyExists){//aqui é um if onde ira pegar o resultado da const e deletar caso ele ja tenha um igual na table, para n existir valores duplicados.
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveyUserAlreadyExists)//retorna o valor repetido 
    }

    //salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
        user_id: user.id,
        survey_id
    });

    await surveysUsersRepository.save(surveyUser);
    //Enviar e-mail para o usuário


    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}

export { SendMailController };
