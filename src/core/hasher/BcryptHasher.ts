import bcrypt from 'bcrypt';
import { PasswordHasher } from './PasswordHasher';
import { logger } from 'utils/logger';

export interface BcryptHasherConfig {
    saltRounds: number;
}

export class BcryptHasher implements PasswordHasher {
  private saltRounds: number;

  constructor(config: BcryptHasherConfig) {
    this.saltRounds = config.saltRounds || 10; // Default to 10 if not provided
  }

  async generateHash(password: string): Promise<string> {
    logger.debug('[Bcrypt] Generando hash', { rounds: this.saltRounds });
    return bcrypt.hash(password, this.saltRounds);
  }

  async verifyHash(password: string, hash: string): Promise<boolean> {
    logger.debug('[Bcrypt] Verificando hash');
    return bcrypt.compare(password, hash);
  }
}
