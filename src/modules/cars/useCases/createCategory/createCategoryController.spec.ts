import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = uuidV4();
    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should not be able to create a new category without token", async () => {
    const response = await request(app).post("/categories").send({
      name: "New Category",
      description: "This is a new category",
    });
    expect(response.status).toBe(401);
  });

  it("should not be able to create a new category if user is not admin", async () => {
    const password = await hash("testeadmin", 8);
    const newid = uuidV4();
    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${newid}', 'teste', 'teste@teste.com.br', '${password}', false, 'now()', 'XXXXX')
      `
    );

    const responseToken = await request(app).post("/sessions").send({
      email: "teste@teste.com.br",
      password: "testeadmin",
    });

    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category test admin",
        description: "Cateegory test admin",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe(
      "You must be an admin to access this route"
    );
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "New Category",
        description: "This is a new category",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not  be able to create a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "New Category",
        description: "This is a new category",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Category already exists" });
  });
});
