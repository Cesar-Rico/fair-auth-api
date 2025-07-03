import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError{
    constructor(message = 'NOT_FOUND', context?: any){
        super(message, 'NOT_FOUND_ERROR',context);
    }
}