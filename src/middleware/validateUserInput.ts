import { Request, Response, NextFunction } from "express"
import { validarDatosUsuario } from "../utils/validations"

export const validateUserInput = (req: Request,res: Response, next: NextFunction ) => {
    const error = validarDatosUsuario(req.body);
    if(error){
        return res.status(400).json({ message: error });
    }
    next();
}