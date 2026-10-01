const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");

const User = require("../models/User");
const Category = require("../models/Category");

describe("Activity CRUD", () => {
  let token;
  let activityId;
  let categoryId;

  beforeAll(async () => {
    // Create category
    const category = await Category.create({
      name: "Nature",
      image: "https://example.com/nature.jpg",
    });

    categoryId = category._id;

    // Create guide
    const hashedPassword = await bcrypt.hash("123456789", 10);

    const guide = await User.create({
      name: "Test Guide",
      email: `guide${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "guide",
      isApproved: true,
    });

    // Login
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({
        email: guide.email,
        password: "123456789",
      });

    token = loginResponse.body.token;
  });

  test("should create an activity", async () => {
    const response = await request(app)
      .post("/activitys")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Mountain Hiking",
        description: "Beautiful hiking experience",
        city: "Beni Mellal",
        location: "Atlas Mountains",
        category: categoryId,
        date: "2026-10-15",
        duration: 5,
        price: 300,
        maxParticipants: 10,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("activity");
    expect(response.body).toHaveProperty("activityId");

    activityId = response.body.activityId;
  });

  test("should get all activities", async () => {
    const response = await request(app)
      .get("/activitys");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("activities");
    expect(Array.isArray(response.body.activities)).toBe(true);
  });

  test("should get activity by id", async () => {
    const response = await request(app)
      .get(`/activitys/${activityId}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("activitys");
  });

  test("should update an activity", async () => {
    const response = await request(app)
      .put(`/activitys/${activityId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Mountain Hiking",
        price: 400,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("activity");
    expect(response.body.activity.title).toBe(
      "Updated Mountain Hiking"
    );
  });

  test("should delete an activity", async () => {
    const response = await request(app)
      .delete(`/activitys/${activityId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "activity delete successfully"
    );
  });
});