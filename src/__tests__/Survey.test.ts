import req from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    //antes de rodar tudo ele ira fazer uma sincronica com esta função
    const connection = await createConnection(); //dentro desta função existe uma const que chama o creatconection
    await connection.runMigrations(); //aqui o codigo ira esperar rodar as migrations pelo createconection.run
  });

  it("Should be able to create a new survey", async () => {
    const res = await req(app).post("/surveys").send({
      title: "title example",
      description: "description example",
    });

    expect(res.status).toBe(201); //201 é o status para create, 400 é o status caso ja exista um bd.
    expect(res.body).toHaveProperty("id");
  });
  //criando pesquisa
  it("should be able to get all surveys", async () => {
    await req(app).post("/surveys").send({
        title:"Title example2",
        description:"Description Example2"
    });

    const res = await req(app).get("/surveys");

    expect(res.body.length).toBe(2);
  });
});
