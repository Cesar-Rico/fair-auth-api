import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError{
    constructor(message = 'Unauthorized', context?: any){
        super(message, 'UNAUTHORIZED_ERROR', context);
    }
}