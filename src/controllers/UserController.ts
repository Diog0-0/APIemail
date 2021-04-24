import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const usersRepository = getCustomRepository(UsersRepository); //criação de repositorio para os usuarios, propria do orm

    //SELECT * FROM users WHERE email = "email"
    const userAlreadyExists = await usersRepository.findOne({
      //aqui ele vai procurar se ja existe um email cadastrado
      email,
    });

    if (userAlreadyExists) {
      //caso ja seja email cadastrado ele retorna o error 400 (ja existe)
      return res.status(400).json({
        error: "User ja existe!",
      });
    }
    //uuid ja é unico e nomes podem variar, por este motivo email seria o unico a verificar.
    const user = usersRepository.create({
      //criando o repositorio
      name,
      email,
    });

    await usersRepository.save(user); //

    return res.status(201).json(user);
  }
}

export { UserController };
