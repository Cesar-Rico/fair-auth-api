import { Request, Response, NextFunction } from "express"
import { validarDatosUsuario } from "../utils/validations"

export const validateUserInput = (req: Request,res: Response, next: NextFunction ): void=> {
    const error = validarDatosUsuario(req.body);
    if(error){
        res.status(400).json({ message: error });
        return;
    }
    next();
}