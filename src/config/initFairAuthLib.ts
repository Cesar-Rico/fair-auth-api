import { JwtTokenStrategy, JwtTokenConfig } from "../core/token/JwtTokenStrategy";
import { TokenStrategy } from "../core/token/TokenStrategy";
import { PasswordHasher } from "core/hasher/PasswordHasher";
import { Argon2Hasher } from "core/hasher/Argon2Hasher";
import { BcryptHasher } from "core/hasher/BcryptHasher";
import { ScryptHasher } from "core/hasher/ScryptHasher";
import { OpaqueTokenStrategy } from "core/token/OpaqueTokenStrategy";

const isDev = process.env.NODE_ENV !== 'production';
const DEFAULT_SECRET = isDev ? 'secret-key-default': undefined;

interface InitFairAuthLibOptions {
  tokenStrategy?: TokenStrategy | {type: 'jwt', config: JwtTokenConfig} | {type: 'opaque', config: any},
  hasher?: PasswordHasher | {type: 'argon2', config?: any} | {type: 'bcrypt', config?: any} | {type: 'scrypt', config?: any}
}

let currentTokenStrategy: TokenStrategy;
let currentHasher: PasswordHasher;

export function InitFairAuthLibOptions(options: InitFairAuthLibOptions = {}) {
    if (!options.tokenStrategy){
        const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
        if(!secret) throw new Error("JWT_SECRET is required in production.");
        currentTokenStrategy = new JwtTokenStrategy( { secret: secret, expiresIn: '1M'})
    } else if('type' in options.tokenStrategy && options.tokenStrategy.type === 'jwt'){
        currentTokenStrategy = new JwtTokenStrategy(options.tokenStrategy.config);
    } else if('type' in options.tokenStrategy && options.tokenStrategy.type === 'opaque'){
        currentTokenStrategy = new OpaqueTokenStrategy(options.tokenStrategy.config);
    } else if(isTokenStrategy(options.tokenStrategy)) {
        currentTokenStrategy = options.tokenStrategy;
    } else {
        throw new Error('Invalid tokenStrategy');
    }

    if (!options.hasher) {
        currentHasher = new BcryptHasher({ saltRounds: 10 });
    } else if ('type' in options.hasher && options.hasher.type === 'argon2') {
        currentHasher = new Argon2Hasher(options.hasher.config);
    } else if ('type' in options.hasher && options.hasher.type === 'bcrypt') {
        currentHasher = new BcryptHasher(options.hasher.config);
    } else if ('type' in options.hasher && options.hasher.type === 'scrypt') {
        currentHasher = new ScryptHasher(options.hasher.config);
    } else if (isPasswordHasher(options.hasher)) {
        currentHasher = options.hasher;
    } else {
        throw new Error('Invalid hasher');
    }

}

export function getTokenStrategy(): TokenStrategy {
    if (!currentTokenStrategy) throw new Error('FaitAuthLib not initialized');
    return currentTokenStrategy;
}

export function isTokenStrategy(obj: any): obj is TokenStrategy {
  return (
    obj &&
    typeof obj.generateToken === 'function' &&
    typeof obj.validateToken === 'function'
  )
}

export function getHasher(): PasswordHasher {
    if (!currentHasher) throw new Error('FaitAuthLib not initialized');
    return currentHasher;
}

export function isPasswordHasher(obj: any): obj is PasswordHasher {
  return (
    obj &&
    typeof obj.generateHash === 'function' &&
    typeof obj.verifyHash === 'function'
  )
}