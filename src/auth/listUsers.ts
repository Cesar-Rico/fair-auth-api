import { UserResponseDTO } from "dtos/userDto";
import { listAllUsers } from "services/userService";
import { validateTokenFunction } from "utils/token";


export const listUsers = async (token: string): Promise<UserResponseDTO[] | null>=>{
    //TODO: Validaciones por rol
    const validateToken = await validateTokenFunction(token);
    if(!validateToken) return null;
    
    return listAllUsers();
}