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
        logger.info('[JWT-SIM] Generando token simulado', {
        expiresIn: this.expiresIn ?? 'no-exp',
        });

        // Simulación: codificamos el payload a base64
        const fakeHeader = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
        const fakePayload = btoa(JSON.stringify(payload));
        const fakeSignature = btoa(this.secret); // NO seguro

        return `${fakeHeader}.${fakePayload}.${fakeSignature}`;
  }

    validateToken(token: string): any {
        logger.debug('[JWT-SIM] Validando token simulado');

        try {
            const parts = token.split('.');
            if (parts.length !== 3) throw new Error('Formato inválido');

            const [headerB64, payloadB64, signatureB64] = parts;

            const payload = JSON.parse(atob(payloadB64));
            const signature = atob(signatureB64);

            if (signature !== this.secret) {
                throw new Error('Token simulado inválido (firma incorrecta)');
            }

            return payload;
        } catch (err) {
            logger.warn('[JWT-SIM] Token inválido o expirado', { error: err });
            throw new Error('Invalid or expired token');
        }
    }
}