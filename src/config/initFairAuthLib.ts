import { JwtTokenStrategy, JwtTokenConfig } from "../core/token/JwtTokenStrategy";
import { TokenStrategy } from "../core/token/TokenStrategy";
import { PasswordHasher } from "core/hasher/PasswordHasher";
import { Argon2Hasher } from "core/hasher/Argon2Hasher";
import { BcryptHasher } from "core/hasher/BcryptHasher";
import { ScryptHasher } from "core/hasher/ScryptHasher";

interface InitFairAuthLibOptions {
  tokenStrategy?: TokenStrategy | {type: 'jwt', config: JwtTokenConfig},
  hasher?: PasswordHasher | {type: 'argon2', config?: any} | {type: 'bcrypt', config?: any} | {type: 'scrypt', config?: any}
}

let currentTokenStrategy: TokenStrategy;
let currentHasher: PasswordHasher;

export function InitFairAuthLibOptions(options: InitFairAuthLibOptions = {}) {
    if (!options.tokenStrategy){
        currentTokenStrategy = new JwtTokenStrategy( { secret: 'pruebita-secret'})
    } else if('type' in options.tokenStrategy && options.tokenStrategy.type === 'jwt'){
        currentTokenStrategy = new JwtTokenStrategy(options.tokenStrategy.config);
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