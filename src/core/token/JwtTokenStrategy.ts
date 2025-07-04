import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenStrategy } from './TokenStrategy'
import { logger } from "utils/logger";

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

        logger.info('[JWT] Generando token', {expiresIn: this.expiresIn ?? 'no-exp'});

        return jwt.sign(payload, this.secret, options);
  }

    validateToken(token: string): any {
        logger.debug('[JWT] Validando token');

        try{
            return jwt.verify(token, this.secret)
        } catch (err) {
            logger.warn('[JWT] Token inválido o expirado', { error: err});
            throw new Error("Invalid or expired token");
        }
    }
}