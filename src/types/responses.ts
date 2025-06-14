import { cleanObject } from "../utils/cleanObject";
export class SucessResponse<T extends Record<string, any>>{
    message: string;
    data: Partial<T>;

    constructor(message: string, data: T){
        this.message = message;
        // Clean the object to remove any undefined or null values
        // and ensure it is a plain object
        // If data is an object, clean it; otherwise, assign it directly
        if (typeof data === 'object' && !Array.isArray(data)) {
            this.data = cleanObject(data);
        } else {
            this.data = data;
        }
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