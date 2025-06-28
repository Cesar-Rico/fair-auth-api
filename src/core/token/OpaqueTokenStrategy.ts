import { TokenStrategy } from "./TokenStrategy";

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
        this.tokenStore.set(token, JSON.stringify(payload));
        return token;
    }

    async validateToken(token: string): Promise<string> {
        const payloadStr = this.tokenStore.get(token);
        if(!payloadStr) throw new Error("Invalid or expired token");
        return JSON.parse(payloadStr);
    }
}


