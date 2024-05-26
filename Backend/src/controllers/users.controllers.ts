import { Request, Response } from "express";
import {
  User,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../models/users.models";

export const getUsersController = (req: Request, res: Response): void => {
  const users: User[] = getUsers();
  res.status(200).json({ users });
};

export const getUserByIdController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);

  isValidUserID(id, res);

  const user: User | undefined = getUserById(id);

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
};

export const createUserController = (req: Request, res: Response): void => {
  const user: User = req.body;
  let existingUser: User | undefined = getUserById(user.id);

  if (existingUser !== undefined) {
    res.status(209).json({
      message: "User already exists with same id!",
    });
  }

  existingUser = getUserByEmail(user.email);

  if (existingUser !== undefined) {
    res.status(209).json({
      message: "User already exists with same email address!",
    });
  }

  createUser(user);
  res.status(201).json({
    message: "User created",
    user,
  });
};

export const updateUserController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  const userUpdate: User = req.body;
  userUpdate.id = id;

  const result = updateUser(userUpdate);

  if (result === false) {
    res.status(404).json({
      message: `User with id: ${id} not found!`,
    });
  } else {
    res.status(200).json({
      message: "User updated",
      user: userUpdate,
    });
  }
};

export const deleteUserController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);

  isValidUserID(id, res);

  const result = deleteUser(id);

  if (result === false) {
    res.status(404).json({
      message: `User with id: ${id} not found!`,
    });
  } else {
    res.status(200).json({
      message: `User ${id} deleted`,
    });
  }
};

function isValidUserID(id: number, res: Response) {
  if (id <= 0) {
    return res
      .status(400)
      .json({ field: "id", message: "id must be greater than 0." });
  }
}
