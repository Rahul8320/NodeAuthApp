import request from "supertest";
import app from "../app";
import { createUser, User } from "../models/users.models";

describe("User Controller", () => {
  // get all users tests
  describe("get all users", () => {
    const user: User = {
      id: 10001,
      name: "Test One",
      email: "test.one@test.com",
      password: "Password12345",
    };

    beforeEach(() => {
      createUser(user);
    });

    it("should return 200 and all users", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("content-type", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("users");
      expect(res.body.users.length).toBeGreaterThan(0);
    });
  });

  // get user by id tests
  describe("get a user", () => {
    const user: User = {
      id: 10002,
      name: "Test Two",
      email: "test.two@test.com",
      password: "Password12345",
    };

    beforeEach(() => {
      createUser(user);
    });

    it("should return 200 and a single user", async () => {
      const res = await request(app)
        .get(`/api/users/${user.id}`)
        .set("content-type", "application/json");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id", user.id);
      expect(res.body.user).toHaveProperty("name", user.name);
      expect(res.body.user).toHaveProperty("email", user.email);
      expect(res.body.user).toHaveProperty("password", user.password);
    });

    it("should return 404 with message", async () => {
      const userId = 8032000;
      const errorMessage = "User not found!";
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("content-type", "application/json");

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", errorMessage);
    });

    it("should return 400 with validation error message", async () => {
      const userId = -10;
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("content-type", "application/json");

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("field", "id");
      expect(res.body).toHaveProperty("message", "id must be greater than 0.");
    });
  });

  // create new user
  describe("create new user", () => {
    it("should return 201 and the user created", async () => {
      const user: User = {
        id: 10003,
        name: "Test Three",
        email: "test.three@test.com",
        password: "Password12345",
      };
      const res = await request(app)
        .post("/api/users")
        .set("content-type", "application/json")
        .send(user);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "User created");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id", user.id);
      expect(res.body.user).toHaveProperty("name", user.name);
      expect(res.body.user).toHaveProperty("email", user.email);
      expect(res.body.user).toHaveProperty("password", user.password);
    });

    it("should return 209 and conflict with id message", async () => {
      const user: User = {
        id: 10003,
        name: "Test Three",
        email: "test.three@test.com",
        password: "Password12345",
      };
      const res = await request(app)
        .post("/api/users")
        .set("content-type", "application/json")
        .send(user);

      expect(res.statusCode).toBe(209);
      expect(res.body).toHaveProperty(
        "message",
        "User already exists with same id!"
      );
    });

    it("should return 209 and conflict with email message", async () => {
      const user: User = {
        id: 10004,
        name: "Test Four",
        email: "test.three@test.com",
        password: "Password12345",
      };
      const res = await request(app)
        .post("/api/users")
        .set("content-type", "application/json")
        .send(user);

      expect(res.statusCode).toBe(209);
      expect(res.body).toHaveProperty(
        "message",
        "User already exists with same email address!"
      );
    });

    it("should return 422 and validation errors", async () => {
      const user: User = {
        id: 0,
        name: "",
        email: "",
        password: "",
      };
      const res = await request(app)
        .post("/api/users")
        .set("content-type", "application/json")
        .send(user);

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty("message", "Invalid request data");
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toHaveLength(4);
    });
  });
});
