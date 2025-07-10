import { scrypt } from 'scrypt-js'; // Web‑friendly / WASM implementation
import { PasswordHasher } from './PasswordHasher';
import { logger } from 'utils/logger';

export interface ScryptHasherConfig {
  /** Longitud (bytes) de la clave derivada. 64 bytes (512 bits) por defecto */
  keyLength?: number;
}

/**
 * Convierte string ⇄ UTF‑8 teniendo en cuenta el entorno (navegador o Node).
 */
const toUTF8 = (str: string): Uint8Array =>
  typeof TextEncoder !== 'undefined'
    ? new TextEncoder().encode(str)          // Navegador / Node ≥ 11
    : Buffer.from(str, 'utf8');              // Node fallback

const fromUTF8 = (bytes: Uint8Array): string =>
  typeof TextDecoder !== 'undefined'
    ? new TextDecoder('utf-8').decode(bytes)
    : Buffer.from(bytes).toString('utf8');

/**
 * Genera una sal criptográficamente segura (Uint8Array) válida en browser y Node.
 */
const generateSalt = (length = 16): Uint8Array => {
  const salt = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(salt);            // Navegador
  } else {
    // Node < 19
    require('crypto').randomFillSync(salt);
  }
  return salt;
};

/**
 * Implementación Scrypt (via scrypt‑js) compatible con navegador.
 * Devuelve/acepta hashes en formato `hexSalt:hexHash` para mayor sencillez.
 */
export class ScryptHasher implements PasswordHasher {
  private readonly keyLength: number;

  constructor(config: ScryptHasherConfig = {}) {
    this.keyLength = config.keyLength ?? 64; // 64 bytes = 512 bits
  }

  /**
   * Genera un hash: `saltHex:hashHex` (ambos en hexadecimal)
   */
  async generateHash(password: string): Promise<string> {
    const salt = generateSalt(16); // 128‑bit salt

    logger.debug('[Scrypt] Generando hash', {
      keyLength: this.keyLength,
      salt: fromUTF8(salt).slice(0, 8) + '…', // trazas compactas
    });

    // Parámetros recomendados por OWASP (N=2^14, r=8, p=1)
    const derivedKey = await scrypt(
      toUTF8(password),
      salt,
      2 ** 14, // N
      8,       // r
      1,       // p
      this.keyLength,
    );

    return (
      Buffer.from(salt).toString('hex') + ':' +
      Buffer.from(derivedKey).toString('hex')
    );
  }

  /**
   * Verifica `password` contra un hash `saltHex:hashHex`.
   */
  async verifyHash(password: string, storedHash: string): Promise<boolean> {
    const [saltHex, hashHex] = storedHash.split(':');
    if (!saltHex || !hashHex) return false;

    logger.debug('[Scrypt] Verificando hash', { salt: saltHex.slice(0, 8) + '…' });

    const salt = Buffer.from(saltHex, 'hex');
    const derivedKey = await scrypt(
      toUTF8(password),
      salt,
      2 ** 14,
      8,
      1,
      this.keyLength,
    );

    return Buffer.from(derivedKey).toString('hex') === hashHex;
  }
}
