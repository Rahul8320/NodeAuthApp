import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  User,
} from "../models/users.models";

// Test user data
const data: User = {
  id: 10001,
  name: "Test User",
  email: "test.user@test.com",
  password: "Password12345",
};

describe("Users Models", () => {
  it("should create a new user", () => {
    // Create a new user
    createUser(data);

    // Get the user
    const user = getUserById(data.id);

    // Should have the same data
    expect(user).toHaveProperty("id", data.id);
    expect(user).toHaveProperty("name", data.name);
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("password", data.password);
  });

  it("should get all users", async () => {
    // Get all users
    const users = getUsers();

    // Should be greater than 0
    expect(users.length).toBeGreaterThan(0);
  });

  it("should get user by id", async () => {
    // Get user by id
    const user = getUserById(data.id);

    // Should have the same data
    expect(user).toHaveProperty("id", data.id);
    expect(user).toHaveProperty("name", data.name);
    expect(user).toHaveProperty("email", data.email);
    expect(user).toHaveProperty("password", data.password);
  });

  it("should update user by id", async () => {
    // New data
    const updatedUserData = {
      id: 10001,
      name: "Test User Edited",
      email: "test.user@test.com",
      password: "Edited#12345",
    };

    // Update user
    updateUser(updatedUserData);

    // Get user by id
    const user = getUserById(updatedUserData.id);

    // Should have the new data
    expect(user).toHaveProperty("id", updatedUserData.id);
    expect(user).toHaveProperty("name", updatedUserData.name);
    expect(user).toHaveProperty("email", updatedUserData.email);
    expect(user).toHaveProperty("password", updatedUserData.password);
  });

  it("should delete user by id", async () => {
    // Delete user
    deleteUser(data.id);

    // Get user by id
    const user = getUserById(data.id);

    // Should be null
    expect(user).toBeUndefined();
  });
});
