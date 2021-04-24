import { Router } from "express"; //import do express para as rotas
import { SendMailController } from "./controllers/SendmailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";//importe do ts Usercontroller para encaminhar as rotas

const router = Router();

const userController = new UserController();//chamada do UserController como const
const surveysController= new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);//criação de rota /users e encaminhamento de criação no UserController quando ela for acessada.

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendmail", sendMailController.execute);

export { router };//exportação do modulo com nome outer
