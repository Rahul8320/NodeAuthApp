export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const users: Array<User> = [
  {
    id: 1,
    name: "Admin One",
    email: "admin.one@test.com",
    password: "123456",
  },
  {
    id: 2,
    name: "User One",
    email: "user.one@test.com",
    password: "secret",
  },
  {
    id: 3,
    name: "Test One",
    email: "test.one@test.com",
    password: "password",
  },
];

export const getUsers = (): Array<User> => {
  return users;
};

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const createUser = (user: User): void => {
  users.push(user);
};

export const updateUser = (user: User): boolean => {
  const index = users.findIndex((u) => u.id === user.id);

  if (index == -1) {
    return false;
  }

  users[index] = user;
  return true;
};

export const deleteUser = (id: number): boolean => {
  const index = users.findIndex((u) => u.id === id);

  if (index == -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
};
