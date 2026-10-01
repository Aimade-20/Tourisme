const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");

const User = require("../models/User");
const Category = require("../models/Category");


describe("Reservation", () => {
  let userToken;
  let guideToken;

  let activityId;
  let reservationId;
  let categoryId;

  beforeAll(async () => {
    // =========================
    // CREATE CATEGORY
    // =========================

    const category = await Category.create({
      name: `Nature${Date.now()}`,
      image: "https://example.com/nature.jpg",
    });

    categoryId = category._id;

    // =========================
    // CREATE USER
    // =========================

    const hashedPassword = await bcrypt.hash("123456789", 10);

    const user = await User.create({
      name: "Test User",
      email: `user${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "user",
    });

    // =========================
    // CREATE GUIDE
    // =========================

    const guide = await User.create({
      name: "Test Guide",
      email: `guide${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "guide",
      isApproved: true,
    });

    // =========================
    // LOGIN USER
    // =========================

    const userLogin = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "123456789",
      });

    userToken = userLogin.body.token;

    // =========================
    // LOGIN GUIDE
    // =========================

    const guideLogin = await request(app)
      .post("/auth/login")
      .send({
        email: guide.email,
        password: "123456789",
      });

    guideToken = guideLogin.body.token;

    // =========================
    // CREATE ACTIVITY
    // =========================

    const activityResponse = await request(app)
      .post("/activitys")
      .set("Authorization", `Bearer ${guideToken}`)
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

    expect(activityResponse.statusCode).toBe(201);

    activityId = activityResponse.body.activityId;
  });

  // =========================
  // CREATE RESERVATION
  // =========================

  test("should create a reservation", async () => {
    const response = await request(app)
      .post(`/activitys/${activityId}/places`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        numberOfPlaces: 2,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("reservation");
    expect(response.body).toHaveProperty("reservationId");
    expect(response.body).toHaveProperty("totalPrice");

    expect(response.body.reservation.numberOfPlaces).toBe(2);
    expect(response.body.totalPrice).toBe(600);

    reservationId = response.body.reservationId;
  });

  // =========================
  // GET USER RESERVATIONS
  // =========================

  test("should get my reservations", async () => {
    const response = await request(app)
      .get("/activitys/reservations/me")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("reservations");

    expect(Array.isArray(response.body.reservations)).toBe(true);

    expect(response.body.reservations.length).toBeGreaterThan(0);
  });

  // =========================
  // GET GUIDE RESERVATIONS
  // =========================

  test("should get reservations of guide activities", async () => {
    const response = await request(app)
      .get("/activitys/reservations/guide")
      .set("Authorization", `Bearer ${guideToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("reservation");

    expect(Array.isArray(response.body.reservation)).toBe(true);

    expect(response.body.reservation.length).toBeGreaterThan(0);
  });

  // =========================
  // CANCEL RESERVATION
  // =========================

  test("should cancel a reservation", async () => {
    const response = await request(app)
      .patch(`/activitys/reservations/${reservationId}/cancel`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe(
      "the resrvation is cancelled"
    );

    expect(response.body).toHaveProperty("reservation");

    expect(response.body.reservation.status).toBe("cancelled");
  });
});