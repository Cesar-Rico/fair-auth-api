import bcrypt from 'bcrypt';

interface UserProps {
  id: number;
  user: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  token?: string;
  ip?: string;
}

export class User {
  readonly id: number;
  readonly user: string;
  private passwordHash: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  token: string;
  ip: string;

  constructor({
    id,
    user,
    password,
    name,
    lastName,
    email,
    token = '',
    ip = '',
  }: UserProps) {
    if (!email.includes('@')) {
      throw new Error('Invalid email address');
    }
    this.id = id;
    this.user = user;
    this.passwordHash = this.hashPassword(password);
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
    this.ip = ip;
  }

  private hashPassword(password: string): string {
    const saltRounds = 10; // Dificultad del hash, 10 está bien por defecto
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  // Método para verificar si un password es correcto
  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  // Opcional: Exponer el hash solo si es necesario
  getPasswordHash(): string {
    return this.passwordHash;
  }
}
