import { CustomError } from "./CustomError";

export class InternalError extends CustomError{
    constructor(message = 'Internal_Error', context?: any){
        super(message, 'INTERNAL_ERROR', context);
    }
}