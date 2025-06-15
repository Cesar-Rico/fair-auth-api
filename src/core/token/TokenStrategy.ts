export interface TokenStrategy {
    generateToken: (payload: any) => Promise<string> | string;
    validateToken: (token: string) => Promise<any> | any;
}