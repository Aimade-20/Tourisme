const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Authentication", () => {
  test("should register a new user", async () => {
    const uniqueId = Date.now();

    const response = await request(app)
      .post("/auth/register")
      .send({
        name: `aimad${uniqueId}`,
        email: `aimad${uniqueId}@gmail.com`,
        password: "123456789",
        role: "user",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("should login the account", async () => {
    // Create user for this test
    await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: "test2@gmail.com",
        password: "123456789",
        role: "user",
      });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test2@gmail.com",
        password: "123456789",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token).not.toBe("");

    console.log("token:", res.body.token);
  });
});