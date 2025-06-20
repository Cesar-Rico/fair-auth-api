export interface UserDTO{
    user: string;
    password: string;
    name: string;
    lastName?: string;
    email: string;
}
export interface UserResponseDTO{
    id?: number,
    user?: string;
    name?: string;
    lastName?: string;
    email?: string;
    status?: number;
}
export interface UserVerifyDTO {
    user: string;
}