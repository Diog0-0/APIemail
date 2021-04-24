import nodemailer, { Transporter } from "nodemailer";

import handlebars from "handlebars";
import fs from "fs";

class SendMailService {
  private client: Transporter;

  constructor() {
    //construtor n permite o async por isso deve passar uma função logo depois do then
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  //const resposta = await execute()

  async execute(to: string, subject: string, variables: object, path: string) {
    
    const templateFileContent = fs.readFileSync(path).toString("utf8"); //falo para o fs dar um readfile(paramn path) como string para utf8 ->2

    const mailTemplateParse = handlebars.compile(templateFileContent); //falo pro handlebars compilar o templete

    const html = mailTemplateParse(variables);

    // const html = mailTemplateParse({ FOI RETIRADO APOS AS ALTERAÇÕES, (AULA 4 -> 01:06:27)
    //   //aqui chamamos o compilador onde passamos as informações das variaveis que no html estão {{}}
    //   name: to, //o to esta sendo chamado do bd (usuario)
    //   title: subject, //esta chamando do bd a coluna definida anteriormente
    //   description: body, //aqui estamos falando que o description é o corpo
    // }); EM VEZ DE PASSAR TODOS OS OBJETOS FOI PASSADO UM VARIABLE COTENDO AS INFORMAÇÕES (de tipo objc)

    const message = await this.client.sendMail({
      to, //coluna name
      subject, //coluna de conteudo
      html, //conteudo gerado em html no handlebars
      from: "NPS <noreplay@nps.com.br>", //quem enviou (origem da mensagem), aparece no inicio ou no fim depende da plataforma de e-mail.
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
