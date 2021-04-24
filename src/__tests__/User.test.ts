import req from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    //antes de rodar tudo ele ira fazer uma sincronica com esta função
    const connection = await createConnection(); //dentro desta função existe uma const que chama o creatconection
    await connection.runMigrations(); //aqui o codigo ira esperar rodar as migrations pelo createconection.run
  });

  it("Should be able to create a new user", async () => {
    const res = await req(app).post("/users").send({
      email: "User@example.com",
      name: "User example",
    });

    expect(res.status).toBe(201); //201 é o status para create, 400 é o status caso ja exista um bd.
  });

  it("should not be able to create a user with exists email", async () => {
    const res = await req(app).post("/users").send({
      email: "User@example.com",
      name: "User example",
    });
    expect(res.status).toBe(400); //201 é o status para create, 400 é o status caso ja exista um bd.
  });
});
