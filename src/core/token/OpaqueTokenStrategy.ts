import { TokenStrategy } from "./TokenStrategy";
import { logger } from "utils/logger";

export interface OpaqueTokenConfig{
    config?: string
}

export class OpaqueTokenStrategy implements TokenStrategy{
    private tokenStore: Map<string, string>

    constructor(config: OpaqueTokenConfig = {}){
        this.tokenStore = new Map();
    }

    async generateToken(payload: any): Promise<string> {
        const token = crypto.randomUUID();
        logger.info('[OpaqueToken] Generando token opaco', { token });
        this.tokenStore.set(token, JSON.stringify(payload));
        return token;
    }

    async validateToken(token: string): Promise<string> {
        logger.debug('[OpaqueToken] Validando token', { token });
        const payloadStr = this.tokenStore.get(token);
        if(!payloadStr) {
            logger.warn('[OpaqueToken] Token inválido / expirado', { token });
            throw new Error("Invalid or expired token");
        }
        return JSON.parse(payloadStr);
    }
}


