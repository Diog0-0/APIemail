import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  /**
   * detratorees => 0-6
   * passivos => 7-8
   * promotores = > 9-10
   * (promotores - detratores)/(respondentes)*100
   */
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params; //chamando o paramaetro em uma const
    
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
    });

    const detractor = surveysUsers.filter(
      //pegando os values dentro de 0 e 6
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length; //lenght é necessario pois o resultado original é um [] com o length ele vira numero

    const totalAnswers = surveysUsers.length;

    const calculate = (promoters - detractor) / totalAnswers; //aqui é feito o calculo

    return res.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };

