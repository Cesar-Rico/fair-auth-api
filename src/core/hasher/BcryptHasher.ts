import bcrypt from 'bcrypt';
import { PasswordHasher } from './PasswordHasher';

export interface BcryptHasherConfig {
    saltRounds: number;
}

export class BcryptHasher implements PasswordHasher {
  private saltRounds: number;

  constructor(config: BcryptHasherConfig) {
    this.saltRounds = config.saltRounds || 10; // Default to 10 if not provided
  }

  async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verifyHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
