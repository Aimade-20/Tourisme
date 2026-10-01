const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");

const User = require("../models/User");
const Activity = require("../models/ActivitySchema");
const Category = require("../models/Category");
const Reservation = require("../models/Reservation");

describe("Admin", () => {
  let adminToken;

  let guideId;
  let guideToken;

  let userId;

  let categoryId;
  let activityId;

  let reservationId;

  beforeAll(async () => {
    // =========================
    // Create Admin
    // =========================

    const hashedPassword = await bcrypt.hash("123456789", 10);

    const admin = await User.create({
      name: "Test Admin",
      email: `admin${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "admin",
    });

    // =========================
    // Login Admin
    // =========================

    const adminLogin = await request(app).post("/auth/login").send({
      email: admin.email,
      password: "123456789",
    });

    adminToken = adminLogin.body.token;

    // =========================
    // Create User
    // =========================

    const user = await User.create({
      name: "Test User",
      email: `user${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "user",
    });

    userId = user._id;

    // =========================
    // Create Guide
    // =========================

    const guide = await User.create({
      name: "Test Guide",
      email: `guide${Date.now()}@gmail.com`,
      password: hashedPassword,
      role: "guide",
      isApproved: false,
    });

    guideId = guide._id;

    // Login Guide
    const guideLogin = await request(app).post("/auth/login").send({
      email: guide.email,
      password: "123456789",
    });

    guideToken = guideLogin.body.token;

    // =========================
    // Create Category
    // =========================

    const category = await Category.create({
      name: `Nature${Date.now()}`,
      image: "https://example.com/nature.jpg",
    });

    categoryId = category._id;

    // =========================
    // Create Activity
    // =========================

    const activity = await Activity.create({
      title: "Mountain Hiking",
      description: "Beautiful hiking experience",
      city: "Beni Mellal",
      location: "Atlas Mountains",
      category: categoryId,
      date: new Date("2026-10-15"),
      duration: 5,
      price: 300,
      maxParticipants: 10,
      availablePlaces: 10,
      guide: guideId,
    });

    activityId = activity._id;

    // =========================
    // Create Reservation
    // =========================

    const reservation = await Reservation.create({
      activity: activityId,
      user: userId,
      numberOfPlaces: 2,
      totalPrice: 600,
      status: "confirmed",
    });

    reservationId = reservation._id;
  });

  // =====================================================
  // CREATE GUIDE
  // =====================================================

  test("should create a guide", async () => {
    const response = await request(app)
      .post("/admin/guides")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New Guide",
        email: `newguide${Date.now()}@gmail.com`,
        password: "123456789",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Guide created successfully");

    expect(response.body).toHaveProperty("guideId");

    expect(response.body).toHaveProperty("guide");
    expect(response.body.guide).toHaveProperty("_id");

    expect(response.body.guide.name).toBe("New Guide");
    expect(response.body.guide.role).toBe("guide");
    expect(response.body.guide.isApproved).toBe(true);
  });

  // =====================================================
  // GET ALL GUIDES
  // =====================================================

  test("should get all guides", async () => {
    const response = await request(app)
      .get("/admin/guides")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("successfull");

    expect(response.body).toHaveProperty("guides");

    expect(Array.isArray(response.body.guides)).toBe(true);

    expect(response.body.guides.length).toBeGreaterThan(0);

    expect(response.body.guides[0]).toHaveProperty("_id");
    expect(response.body.guides[0]).toHaveProperty("name");
    expect(response.body.guides[0]).toHaveProperty("email");
    expect(response.body.guides[0].role).toBe("guide");
  });

  // =====================================================
  // APPROVE GUIDE
  // =====================================================

  test("should approve a guide", async () => {
    const response = await request(app)
      .patch(`/admin/guides/${guideId}/approve`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toBe("Guide approved successfully");

    expect(response.body).toHaveProperty("guide");

    expect(response.body.guide).toHaveProperty("_id");

    expect(response.body.guide._id.toString()).toBe(guideId.toString());

    expect(response.body.guide.role).toBe("guide");

    expect(response.body.guide.isApproved).toBe(true);
  });

  // =====================================================
  // UPDATE GUIDE
  // =====================================================

  test("should update a guide", async () => {
    const response = await request(app)
      .put(`/admin/guides/${guideId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Updated Guide",
        email: `updatedguide${Date.now()}@gmail.com`,
        isApproved: true,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toBe("Guide updated successfully");

    expect(response.body).toHaveProperty("guide");

    expect(response.body.guide).toHaveProperty("_id");

    expect(response.body.guide.name).toBe("Updated Guide");

    expect(response.body.guide.role).toBe("guide");

    expect(response.body.guide.isApproved).toBe(true);
  });

  // =====================================================
  // DELETE GUIDE
  // =====================================================

  test("should delete a guide", async () => {
    // Create a guide specifically for delete
    const guideToDelete = await User.create({
      name: "Guide To Delete",
      email: `deleteguide${Date.now()}@gmail.com`,
      password: await bcrypt.hash("123456789", 10),
      role: "guide",
      isApproved: true,
    });

    const response = await request(app)
      .delete(`/admin/guides/${guideToDelete._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toBe("Guide deleted successfully");

    expect(response.body).toHaveProperty("result");

    expect(response.body.result.message).toBe("Guide deleted successfully");
  });

  // =====================================================
  // GET ALL USERS
  // =====================================================

  test("should get all users", async () => {
    const response = await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toBe("all users");

    expect(response.body).toHaveProperty("users");

    expect(Array.isArray(response.body.users)).toBe(true);

    expect(response.body.users.length).toBeGreaterThan(0);

    expect(response.body.users[0]).toHaveProperty("_id");
    expect(response.body.users[0]).toHaveProperty("name");
    expect(response.body.users[0]).toHaveProperty("email");

    expect(response.body.users[0].role).toBe("user");
  });

  // =====================================================
  // GET ALL ACTIVITIES
  // =====================================================

  test("should get all activities", async () => {
    const response = await request(app)
      .get("/admin/activities")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("activities");

    expect(Array.isArray(response.body.activities)).toBe(true);

    expect(response.body.activities.length).toBeGreaterThan(0);

    expect(response.body.activities[0]).toHaveProperty("_id");

    expect(response.body.activities[0]).toHaveProperty("title");

    expect(response.body.activities[0].title).toBe("Mountain Hiking");
  });

  // =====================================================
  // GET ALL RESERVATIONS
  // =====================================================

  test("should get all reservations", async () => {
    const response = await request(app)
      .get("/admin/reservations")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("reservations");

    expect(Array.isArray(response.body.reservations)).toBe(true);

    expect(response.body.reservations.length).toBeGreaterThan(0);

    expect(response.body.reservations[0]).toHaveProperty("_id");

    expect(response.body.reservations[0]).toHaveProperty("numberOfPlaces");

    expect(response.body.reservations[0]).toHaveProperty("totalPrice");

    expect(response.body.reservations[0]).toHaveProperty("status");

    expect(response.body.reservations[0].numberOfPlaces).toBe(2);

    expect(response.body.reservations[0].totalPrice).toBe(600);

    expect(response.body.reservations[0].status).toBe("confirmed");
  });
});
