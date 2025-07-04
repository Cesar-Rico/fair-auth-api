import { PasswordHasher } from './PasswordHasher';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { logger } from 'utils/logger';

export interface ScryptHasherConfig {
    keyLength?: number; // Length of the derived key, default is 64 bytes
}

const scryptAsync = promisify(scrypt);

export class ScryptHasher implements PasswordHasher {
    
    private keyLength: number;
    
    constructor(config: ScryptHasherConfig) {
        this.keyLength = config.keyLength || 64; // Default to 64 bytes if not provided;
    }

    async generateHash(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        logger.debug('[Scrypt] Generando hash', { keyLength: this.keyLength, salt });
        const derivedKey = (await scryptAsync(password, salt, this.keyLength)) as Buffer;
        return `${salt}:${derivedKey.toString('hex')}`;
    }

    async verifyHash(password: string, storedHash: string): Promise<boolean> {
        const [salt, hash] = storedHash.split(':');
        if (!salt || !hash) return false;

        logger.debug('[Scrypt] Verificando hash', { salt });

        const derivedKey = (await scryptAsync(password, salt, this.keyLength)) as Buffer;
        return derivedKey.toString('hex') === hash;
    }
}
