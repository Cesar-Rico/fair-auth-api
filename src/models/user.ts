import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { UserInput } from 'types/user';
import { getHasher } from 'config/initFairAuthLib';
import { validatePassword } from 'utils/validations';

dotenv.config();

const HASH_ALGORITHM = process.env.HASH_ALGORITHM?.toLowerCase() || 'bcrypt';

export class User {
  private static currentId = 0;

  readonly id: number;
  readonly user: string;
  private passwordHash: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly status: number = 1; // Default status is true
  token: string;
  ip: string;

  private constructor({
    id,
    user,
    passwordHash,
    name,
    lastName,
    email,
    status = 1,
    token = '',
    ip = '',
  }: {
    id: number;
    user: string;
    passwordHash: string;
    name: string;
    lastName?: string;
    email: string;
    status: number;
    token?: string;
    ip?: string;
  }) {
    this.id = id;
    this.user = user;
    this.passwordHash = passwordHash;
    this.name = name;
    this.lastName = lastName ?? '';
    this.email = email;
    this.status = status;
    this.token = token ?? '';
    this.ip = ip ?? '';
  }

  static async create(props: UserInput): Promise<User> {
    if (!props.email.includes('@')) {
      throw new Error('Invalid email');
    }

    let obs: string | null = validatePassword(props.password);
    if (obs) {
      obs = `Password validation error: ${obs}`;
      throw new Error(obs);
    }

    const id = ++User.currentId;
    //const passwordHash = await User.hashPassword(props.password);
    const passwordHash = await User.hashPasswordStrategy(props.password);
    return new User({ ...props, id, passwordHash });
  }

  static async hashPasswordStrategy(password: string): Promise<string>{

    const hasher = await getHasher().generateHash(password);
    return hasher;
  }

  async verifyPasswordStrategy(password: string): Promise<boolean> {
    const match = await getHasher().verifyHash(password, this.passwordHash);
    return match;
  }

  // Static method to hash a password using the configured algorithm
  // version anterior
  static async hashPassword(password: string): Promise<string> {
    switch (HASH_ALGORITHM) {
      case 'bcrypt': {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }
      case 'argon2':
        return await argon2.hash(password);

      case 'scrypt': {
        const salt = crypto.randomBytes(16);
        const derivedKey = await new Promise<Buffer>((resolve, reject) => {
          crypto.scrypt(password, salt, 64, (err, key) => {
            if (err) reject(err);
            else resolve(key);
          });
        });
        return `scrypt$${salt.toString('hex')}$${derivedKey.toString('hex')}`;
      }

      case 'pbkdf2': {
        const salt = crypto.randomBytes(16);
        const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
        return `pbkdf2$${salt.toString('hex')}$${derivedKey.toString('hex')}`;
      }

      default:
        throw new Error(`Unsupported HASH_ALGORITHM: ${HASH_ALGORITHM}`);
    }
  }
  // Method to verify a password against the stored hash
  // version anterior
  async verifyPassword(password: string): Promise<boolean> {
    switch (HASH_ALGORITHM) {
      case 'bcrypt':
        return await bcrypt.compare(password, this.passwordHash);

      case 'argon2':
        return await argon2.verify(this.passwordHash, password);

      case 'scrypt': {
        const [_, saltHex, hashHex] = this.passwordHash.split('$');
        const salt = Buffer.from(saltHex, 'hex');
        const hash = Buffer.from(hashHex, 'hex');
        const derivedKey = await new Promise<Buffer>((resolve, reject) => {
          crypto.scrypt(password, salt, 64, (err, key) => {
            if (err) reject(err);
            else resolve(key);
          });
        });
        return crypto.timingSafeEqual(hash, derivedKey);
      }

      case 'pbkdf2': {
        const [_, saltHex, hashHex] = this.passwordHash.split('$');
        const salt = Buffer.from(saltHex, 'hex');
        const hash = Buffer.from(hashHex, 'hex');
        const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
        return crypto.timingSafeEqual(hash, derivedKey);
      }

      default:
        throw new Error(`Unsupported HASH_ALGORITHM: ${HASH_ALGORITHM}`);
    }
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
