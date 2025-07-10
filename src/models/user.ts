import dotenv from 'dotenv';
import { UserInput } from 'types/user';
import { getHasher } from 'config/initFairAuthLib';
import { validatePassword } from 'utils/validations';
import { logger } from 'utils/logger';

dotenv.config();

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
      logger.warn('[User.create] email inválido:', props.email);
      throw new Error('Invalid email');
    }

    let obs: string | null = validatePassword(props.password);
    if (obs) {
      //obs = `Password validation error: ${obs}`;
      logger.warn('[User.create] password inválido:', obs);
      throw new Error(obs);
    }

    try {
      const id = ++User.currentId;
      const passwordHash = await User.hashPasswordStrategy(props.password);
      const nuevo = new User({ ...props, id, passwordHash });

      logger.debug('[User.create] nuevo usuario instanciado', {id, user: nuevo.user, });
      return nuevo;
    } catch (err) {
      logger.error('[User.create] hash/instanciación fallida', err);
      throw err;
    }

  }

  static async hashPasswordStrategy(password: string): Promise<string>{

    const hasher = await getHasher().generateHash(password);
    return hasher;
  }

  async verifyPasswordStrategy(password: string): Promise<boolean> {
    const match = await getHasher().verifyHash(password, this.passwordHash);
    return match;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
