import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.query;

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