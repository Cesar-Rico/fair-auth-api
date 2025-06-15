export interface LoginResponseDTO{
    id: number,
    username: string,
    token: string,
    validated?: boolean,
    method: string
}