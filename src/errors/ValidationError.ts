import { CustomError } from "./CustomError";

export class ValidationError extends CustomError{
    constructor(message = 'Validation Error', context?: any){
        super(message, "VALIDATION_ERROR", context);
    }
}