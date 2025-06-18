export interface PasswordHasher {
  generateHash(password: string): Promise<string>;
  verifyHash(password: string, hash: string): Promise<boolean>;
}
