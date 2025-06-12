import{ Request, Response } from 'express';
import { User } from '../models/user';
import { registerUser, listAllUsers, validateUser } from '../services/userService';
import { mapUserDtoToInput } from '../mappers/userMapper';
import { UserDTO } from 'dtos/userDto';
// Registrar usuario
// TODO: Cambiar a POST para prod
export const createUser = async (req: Request, res: Response) => {
  try {
    const userDto: UserDTO = req.body;
    const userInput = mapUserDtoToInput(userDto);
    const user = await registerUser(userInput);
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
    const match: boolean = await validateUser(req.body.email, req.body.password);
    res.json({"validado": match, "message": match ? "Email validado correctamente": "Datos incorrectos"});
}

export const listUsers = (req: Request, res: Response) =>{
    res.status(200).json(listAllUsers());
}