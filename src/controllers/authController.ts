import{ Request, Response } from 'express';
import { User } from '../models/user';
import { registerUser, listAllUsers, validateUser } from '../services/userService';
import { mapUserDtoToInput } from '../mappers/userMapper';
import { UserDTO, UserResponseDTO } from 'dtos/userDto';
import { ErrorResponse, SucessResponse } from '../types/responses';
// Registrar usuario
// TODO: Cambiar a POST para prod
export const createUser = async (req: Request, res: Response) => {
  try {
    const userDto: UserDTO = req.body;
    const userInput = mapUserDtoToInput(userDto);
    const user = await registerUser(userInput);
    const userResponseDTO: UserResponseDTO = {
      user: user.user,
    }
    res.status(201).json(new SucessResponse("Usuario creado exitosamente", userResponseDTO))
  } catch (error) {
    res.status(400).json(new ErrorResponse("Error al crear el usuario", (error as Error).message));
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const match: boolean = await validateUser(req.body.email, req.body.password);
    res.json({"validado": match, "message": match ? "Email validado correctamente": "Datos incorrectos"});
}

export const listUsers = (req: Request, res: Response) =>{
    res.status(200).json(listAllUsers());
}