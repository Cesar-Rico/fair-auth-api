import { hash, verify, ArgonType } from 'argon2-browser'; 
import { PasswordHasher } from './PasswordHasher';
import { logger } from 'utils/logger';

export interface Argon2HasherConfig {
    timeCost: number;
    memoryCost: number;
    parallelism: number;
    type?: 'argon2i' | 'argon2d' | 'argon2id'; // opcional, si quieres hacerlo configurable
}

function generateSalt(length = 16): Uint8Array {
    const salt = new Uint8Array(length);
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(salt);
    } else {
        // Node.js fallback
        require('crypto').randomFillSync(salt);
    }
    return salt;
}

export class Argon2Hasher implements PasswordHasher {

    private timeCost: number;
    private memoryCost: number;
    private parallelism: number;
    private type: 'argon2i' | 'argon2d' | 'argon2id';

    constructor(config: Argon2HasherConfig) {
        this.timeCost = config.timeCost || 3; // Default to 3 if not provided
        this.memoryCost = config.memoryCost || 65536; // Default to 64MB if not provided
        this.parallelism = config.parallelism || 1; // Default to 1 if not provided
        this.type = config.type || 'argon2id'; // Default to argon2id if not provided
    }

    /** Genera un hash Argon2 (WASM, apto para navegador) */
    async generateHash(password: string): Promise<string> {
        logger.debug('[Argon2] Generando hash', {
            timeCost: this.timeCost,
            memoryCost: this.memoryCost,
            parallelism: this.parallelism,
            type: this.type
        });

        // Map string to ArgonType
        const typeMap: Record<'argon2i' | 'argon2d' | 'argon2id', ArgonType> = {
            argon2i: ArgonType.Argon2i,
            argon2d: ArgonType.Argon2d,
            argon2id: ArgonType.Argon2id,
        };

        const salt = generateSalt(16);

        const { encoded } = await hash({
            pass: password,
            salt,
            time: this.timeCost,
            mem:  this.memoryCost,
            parallelism: this.parallelism,
            type: typeMap[this.type], // Use mapped ArgonType
        });

        return encoded;  // string con el hash Argon2
    }

    /** Verifica un hash Argon2 */
    async verifyHash(password: string, encoded: string): Promise<boolean> {
        logger.debug('[Argon2] Verificando hash');
        try {
            const result = await verify({ pass: password, encoded });
            return result === true; // Ensures only true is accepted, otherwise false
        } catch (err) {
            logger.error('[Argon2] Error verificando hash', err);
            return false;
        }
    }
}
