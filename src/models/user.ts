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
  private static currentId = 0; // <- empieza en 0

  readonly id: number;
  readonly user: string;
  private passwordHash: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  token: string;
  ip: string;

  constructor({
    user,
    password,
    name,
    lastName,
    email,
    token = '',
    ip = ''
  }: Omit<UserProps, 'id'>) { // <- omitimos id porque lo genera la clase

    if (!email.includes('@')) {
      throw new Error('Invalid email address');
    }
    User.currentId += 1;           // <-- Incrementa
    this.id = User.currentId;      // <-- Asigna

    this.user = user;
    this.passwordHash = this.hashPassword(password);
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
    this.ip = ip;
  }

  private hashPassword(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
