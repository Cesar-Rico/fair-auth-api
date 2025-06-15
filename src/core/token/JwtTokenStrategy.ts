import jwt from 'jsonwebtoken'
import { TokenStrategy } from './TokenStrategy'

export interface JwtTokenConfig {
    secret: string;
    expiresIn?: number;
}

export class JwtTokenStrategy implements TokenStrategy{
    private secret: string;
    private expiresIn?: number;

    constructor(config: JwtTokenConfig) {
        this.secret = config.secret;
        this.expiresIn = config.expiresIn;
    }

    generateToken(payload: any): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
    }

    validateToken(token: string): any {
        return jwt.verify(token, this.secret )
    }
}