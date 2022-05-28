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

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
    await request(app)
      .post("/categories")
      .send({
        name: "New Category",
        description: "This is a new category",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.body).toHaveLength(1);
  });

  it("should not be able to show list of categories without a valid token", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Token is missing");
  });
});
