import "reflect-metadata"; //aqui é puxado o metadata, deve ser em primeiro pq é imporante
import express from "express"; //foi importado o modulo espress
// como ele foi adicionado pelo YARN ao package, basta chamar como import mesmo
// import "./database"; //por padrão ele ja busca um index.ts que esta dentro da database
import createConnection from "./database"
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };
