export interface UserDTO{
    user: string;
    password: string;
    name: string;
    lastName?: string;
    email: string;
}
export interface UserResponseDTO{
    user?: string;
    name?: string;
    lastName?: string;
    email?: string;
    status?: number;
}