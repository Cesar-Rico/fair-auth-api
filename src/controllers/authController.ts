import{ Request, Response } from 'express';
import { User } from '../models/user';
import { registerUser, listAllUsers, validateUser } from '../services/userService';
import { mapUserDtoToInput } from '../mappers/userMapper';
import { UserDTO, UserResponseDTO } from 'dtos/userDto';
import { ErrorResponse, SucessResponse } from '../types/responses';
import { LoginResponseDTO } from 'dtos/loginDto';
import { getHasher, getTokenStrategy, InitFairAuthLibOptions } from '../config/initFairAuthLib';
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
    const userFind: User | null = await validateUser(req.body.email, req.body.password);
    if(!userFind){
      res.status(401).json(new ErrorResponse("Credenciales inválidas"));
      return;
    }
    const loginResponseDTO: LoginResponseDTO = {
      id: userFind.id,
      username: userFind.user,
      token: '',
      method: 'password'
    }
    res.status(200).json(new SucessResponse("Inicio de sesion exitoso", loginResponseDTO));
}

export const listUsers = (req: Request, res: Response): void =>{
    const result:UserResponseDTO[] = listAllUsers();
    if (Array.isArray(result) && result.length === 0) {
        res.status(404).json(new SucessResponse("No hay usuarios registrados", []));
    }
    res.status(200).json(new SucessResponse("Lista de usuarios", result));
}

export const generateToken = async (req: Request, res: Response)=> {

  const token = await getTokenStrategy().generateToken({ userId: 123});

  res.status(200).json(new SucessResponse("Token", {"token": token}));
}

export const validateToken = async (req: Request, res: Response) => {
  let match;
  try{
    match = await getTokenStrategy().validateToken(req.body.token);
  }catch(e){
    res.status(200).json(new SucessResponse("Validado", {"Validado": false}));
  }
  res.status(200).json(new SucessResponse("Validado", {"Validado": match}));
}

export const generateHasher = async (req: Request, res: Response)=> {

  InitFairAuthLibOptions({
    tokenStrategy: {
      type: 'jwt',
      config: {
        secret: 'pruebita-secret',
        expiresIn: 100
      }
    },
    hasher: {
      
      type: 'bcrypt',
      config: {
        saltRounds: 10
      }
      
      /*
      type: 'argon2',
      config: {
        memoryCost: 2 ** 16, // 64 MB
        timeCost: 3,
        parallelism: 1,
        hashLength: 32,
        saltLength: 16
      }
      */
      /*
      type: 'scrypt',
      config: {
        N: 16384, // CPU/memory cost
        r: 8, // Block size
        p: 1, // Parallelization factor
        dkLen: 64, // Length of the derived key
        maxmem: 64 * 1024 * 1024 // Maximum memory usage in bytes (64 MB)
      }
      */
      /*
      generateHash: async (data: string) => {
        // Implement your hashing logic here
        return `hashed-${data}`;
      },
      verifyHash: async (data: string, hash: string) => {
        // Implement your hash verification logic here
        return hash === `hashed-${data}`;
      }
      */
    }
  });
  
  const hasher = await getHasher().generateHash('test-password');

  res.status(200).json(new SucessResponse("Hasher", {"hash": hasher}));
}