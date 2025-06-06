import{ Request, Response } from 'express';
import { User } from '../models/user';
// Registrar usuario
// TODO: Cambiar a POST para prod

let users: User[] = [];
export const createUser = (req: Request, res: Response) => {
    const user = new User(req.body);
    users.push(user);
    res.json({"message": "Usuario creado exitosamente"});
}

export const loginUser = (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    let userFind: User | undefined = users.find(objUser => objUser.user === username);
   
    if(userFind){
        const match: boolean = userFind.verifyPassword(password);
        res.json({"validado": match, "message": match ? "Usuario validado correctamente": "Contraseña no valida"});
    }else{
        res.json({"validado": false, "message": "No se encontro usuario en base de datos"});
    }
}

export const listUsers = (req: Request, res: Response) => {
    res.json({"users": users});
}