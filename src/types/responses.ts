import { cleanObject } from "../utils/cleanObject";
export class SucessResponse<T extends Record<string, any>>{
    message: string;
    data: Partial<T>;

    constructor(message: string, data: T){
        this.message = message;
        this.data = cleanObject(data);
    }
}

export class ErrorResponse<T>{
    message: string;
    error?: string;

    constructor(message: string, error?: string){
        this.message = message;
        this.error = error;
    }
}