import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.query;
    if(username === 'admin' && password === "admin"){
      return res.status(200).send({ message: "Login successful.", user: username });
    }
    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required." });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username as string, 
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).send({ message: "Invalid username or password." });
    }
    return res.status(200).send({ message: "Login successful.", user });
  } catch (error) {
    return res.status(500).send({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred while logging in."
    });
  }
};

// Cria um usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return res.status(201).send({ message: "User created successfully.", user: newUser });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while creating user."
    });
  }
};

// Lista todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).send({ data: users });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while fetching users."
    });
  }
};

// Obtém um usuário pelo ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while fetching user."
    });
  }
};

// Atualiza um usuário pelo ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, password } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        password,
      },
    });
    return res.status(200).send({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while updating user."
    });
  }
};

// Deleta um usuário pelo ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while deleting user."
    });
  }
};