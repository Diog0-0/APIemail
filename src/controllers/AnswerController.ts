import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  //http://localhost:3538/answers/10?u=a66e8eed-c59d-42b7-8c2c-a0ed0722c0a3
  //Route params => Parametros que compõe a rota
  //routes.get("/answers/:value/:") o value seria o params que vamos recuperar depois.
  /*query params => busca, paginação, não obrigatorios , reconhecivel pelo "?"
    sempre vem como chave = valor -> ?=answers
    */

  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u), //o valor espera uma string, fazendo assim estou forçando a ser string para evitar erros.
    });

    if (!surveyUser) {
      return res.status(400).json({
        error: "Survey User does not exists!",
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
