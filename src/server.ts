// import "reflect-metadata"; //aqui é puxado o metadata, deve ser em primeiro pq é imporante
// import express from "express"; //foi importado o modulo espress
// como ele foi adicionado pelo YARN ao package, basta chamar como import mesmo
// import "./database"; //por padrão ele ja busca um index.ts que esta dentro da database
// import { router } from "./routes";

// const app = express();
/*GET => Busca
  POST => Salvar
  PUT => Alterar
  DELETE => Deletar
  PATCH => Alteração especifica  

 
// http://localhost:3333/users
app.get("/", (req, res) => {
  //em typescript para função basta usar ()=>{}
  return res.json({ message: "Hello-world :D" });
});

//1 param => Rota(recurso API)
//2 param => request, response

app.post("/", (req, res) => {
  //recebeu os dados para salvar
  return res.json({ message: "Os dados foram salvos com sucesso!" });
});*/
import { app } from "./app"

// app.use(express.json());//é necessario para o servidor receber o formato json, pois em TS json não é padrão.
// app.use(router);//acessando o express e chamando o arquivo que exportei com nome router (arquivo de rotas)

app.listen(3333, () => console.log("Server is running!"));
