import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenStrategy } from './TokenStrategy'

export interface JwtTokenConfig {
    secret: string;
    expiresIn?: string | number;
}

export class JwtTokenStrategy implements TokenStrategy{
    private secret: string;
    private expiresIn?: string | number;

    constructor(config: JwtTokenConfig) {
        this.secret = config.secret;
        this.expiresIn = config.expiresIn;
    }

    generateToken(payload: any): string {
        const options: SignOptions = {};

        if (this.expiresIn !== undefined) {
            options.expiresIn = this.expiresIn as SignOptions['expiresIn'];
        }

        return jwt.sign(payload, this.secret, options);
  }

    validateToken(token: string): any {
        return jwt.verify(token, this.secret )
    }
}