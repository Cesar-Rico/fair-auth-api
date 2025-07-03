import { CustomError } from "./CustomError";

export class ConflictError extends CustomError{
    constructor(message = "Conflict", context?: any){
        super(message, "CONFLICT_ERROR", context);
    }
}