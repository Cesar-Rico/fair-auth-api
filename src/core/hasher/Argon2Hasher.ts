import argon2 from 'argon2';
import { PasswordHasher } from './PasswordHasher';

export interface Argon2HasherConfig {
    timeCost: number;
    memoryCost: number;
    parallelism: number;
    type?: 'argon2i' | 'argon2d' | 'argon2id'; // opcional, si quieres hacerlo configurable
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
    
    async generateHash(password: string): Promise<string> {
    return argon2.hash(password, {
        timeCost: this.timeCost,
        memoryCost: this.memoryCost,
        parallelism: this.parallelism,
        type: argon2.argon2id // o argon2i / argon2d si lo haces configurable
    });
    }

    async verifyHash(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
    }
}
