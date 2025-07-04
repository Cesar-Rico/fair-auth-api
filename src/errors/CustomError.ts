export class CustomError extends Error{
    constructor(message: string, public code?: string, public context?: any){
        super(message);
        this.name = new.target.name;
        Error.captureStackTrace(this, new.target);
    }
}