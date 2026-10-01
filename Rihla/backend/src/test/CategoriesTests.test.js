const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");

const User = require("../models/User");
const Category = require("../models/Category");

describe("Category CRUD", () => {
  let token;
  let categoryId;

  beforeAll(async () => {
    // Create admin
    const hashedPassword = await bcrypt.hash("123456789", 10);

    const admin = await User.create({
      name: "Test Admin",
      email: `admin${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "admin",
    });

    // Login admin
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({
        email: admin.email,
        password: "123456789",
      });

    token = loginResponse.body.token;
  });

  // CREATE
  test("should create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Nature${Date.now()}`,
        image: "https://example.com/nature.jpg",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("category");

    expect(response.body.category).toHaveProperty("_id");
    expect(response.body.category.name).toContain("Nature");

    categoryId = response.body.category._id;
  });

  // READ
  test("should get all categories", async () => {
    const response = await request(app)
      .get("/categories");

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("categorys");

    expect(Array.isArray(response.body.categorys)).toBe(true);
  });

  // UPDATE
  test("should update a category", async () => {
    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Updated Nature${Date.now()}`,
        image: "https://example.com/updated.jpg",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("newCategory");

    expect(response.body.newCategory.name).toContain(
      "Updated Nature"
    );
  });

  // DELETE
  test("should delete a category", async () => {
    const response = await request(app)
      .delete(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Category deleted successfully"
    );
  });
});