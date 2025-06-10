import{ Request, Response } from 'express';
import { User } from '../models/user';
import { validarDatosUsuario } from '../utils/validations';
// Registrar usuario
// TODO: Cambiar a POST para prod

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let users: User[] = [];
export const createUser = async (req: Request, res: Response) => {
  try {
    let observacion = validarDatosUsuario(req.body);
    if (observacion) {
      res.json({ message: observacion });
      return;
    }

    const user = await User.create(req.body);
    users.push(user);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      username: user.user,
      passwordHash: user.getPasswordHash() // ✅ para que el test pase
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(400).json({
      message: (error as Error).message || "Error al crear el usuario"
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    let userFind: User | undefined = users.find(objUser => objUser.user === username);
   
    if(userFind){
        const match: boolean = await userFind.verifyPassword(password);
        res.json({"validado": match, "message": match ? "Usuario validado correctamente": "Contraseña no valida"});
    }else{
        res.json({"validado": false, "message": "No se encontro usuario en base de datos"});
    }
}

export const listUsers = (req: Request, res: Response) => {
    res.json({"users": users});
}