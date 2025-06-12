import{ Request, Response } from 'express';
import { User } from '../models/user';
import { registerUser, listAllUsers, validateUser } from '../services/userService';
// Registrar usuario
// TODO: Cambiar a POST para prod
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "Usuario creado exitosamente",
      username: user.user,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(400).json({
      message: (error as Error).message || "Error al crear el usuario"
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const match: boolean = await validateUser(req.body.username, req.body.password);
    res.json({"validado": match, "message": match ? "Usuario validado correctamente": "Usuario no valido"});
}

export const listUsers = (req: Request, res: Response) =>{
    res.status(200).json(listAllUsers());
}