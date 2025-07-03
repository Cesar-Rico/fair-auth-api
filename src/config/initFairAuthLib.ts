import { JwtTokenStrategy, JwtTokenConfig } from "../core/token/JwtTokenStrategy";
import { TokenStrategy } from "../core/token/TokenStrategy";
import { PasswordHasher } from "core/hasher/PasswordHasher";
import { Argon2Hasher } from "core/hasher/Argon2Hasher";
import { BcryptHasher } from "core/hasher/BcryptHasher";
import { ScryptHasher } from "core/hasher/ScryptHasher";
import { OpaqueTokenStrategy } from "core/token/OpaqueTokenStrategy";
import { logger } from '../utils/logger';

const isDev = process.env.NODE_ENV !== 'production';
const DEFAULT_SECRET = isDev ? 'secret-key-default': undefined;

interface InitFairAuthLibOptions {
  tokenStrategy?: TokenStrategy | {type: 'jwt', config: JwtTokenConfig} | {type: 'opaque', config: any},
  hasher?: PasswordHasher | {type: 'argon2', config?: any} | {type: 'bcrypt', config?: any} | {type: 'scrypt', config?: any}
}

let currentTokenStrategy: TokenStrategy;
let currentHasher: PasswordHasher;

export function InitFairAuthLibOptions(options: InitFairAuthLibOptions = {}) {
    
    // ---------- Token strategy ----------
    if (!options.tokenStrategy){
        const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
        if(!secret) {
            logger.error('[Init] JWT_SECRET no definido en producción');
            throw new Error("JWT_SECRET is required in production.");
        }
        logger.info('[Init] TokenStrategy por defecto: jwt');
        currentTokenStrategy = new JwtTokenStrategy( { secret: secret, expiresIn: '1M'})
    } else if('type' in options.tokenStrategy) {
        if (options.tokenStrategy.type === 'jwt') {
            logger.info('[Init] TokenStrategy: jwt (custom config)');
            currentTokenStrategy = new JwtTokenStrategy(options.tokenStrategy.config,);
        } else if (options.tokenStrategy.type === 'opaque') {
            logger.info('[Init] TokenStrategy: opaque (custom config)');
            currentTokenStrategy = new OpaqueTokenStrategy(options.tokenStrategy.config,);
        } else {
            logger.error('[Init] TokenStrategy desconocida:');
            throw new Error('Invalid tokenStrategy');
        }
    } else if(isTokenStrategy(options.tokenStrategy)) {
        logger.info('[Init] TokenStrategy: instancia pasada por el consumidor');
        currentTokenStrategy = options.tokenStrategy;
    } else {
        logger.error('[Init] tokenStrategy inválida');
        throw new Error('Invalid tokenStrategy');
    }

    // ---------- Password hasher ----------

    if (!options.hasher) {
        logger.info('[Init] Hasher por defecto: bcrypt (saltRounds=10)');
        currentHasher = new BcryptHasher({ saltRounds: 10 });
    } else if ('type' in options.hasher) {
        switch (options.hasher.type) {
            case 'argon2':
                logger.info('[Init] Hasher: argon2');
                currentHasher = new Argon2Hasher(options.hasher.config);
                break;
            case 'bcrypt':
                logger.info('[Init] Hasher: bcrypt');
                currentHasher = new BcryptHasher(options.hasher.config);
                break;
            case 'scrypt':
                logger.info('[Init] Hasher: scrypt');
                currentHasher = new ScryptHasher(options.hasher.config);
                break;
            default:
                logger.error('[Init] Hasher desconocido');
                throw new Error('Invalid hasher');
        }
    } else if (isPasswordHasher(options.hasher)) {
        logger.info('[Init] Hasher: instancia pasada por el consumidor');
        currentHasher = options.hasher;
    } else {
        logger.error('[Init] hasher inválido');
        throw new Error('Invalid hasher');
    }

    logger.debug('[Init] Config final', {tokenStrategy: currentTokenStrategy.constructor.name, hasher: currentHasher.constructor.name,});

}

export function getTokenStrategy(): TokenStrategy {
    if (!currentTokenStrategy){
        logger.error('[Core] tokenStrategy no inicializada'); 
        throw new Error('FaitAuthLib not initialized');
    }

    logger.debug('[Core] tokenStrategy →', currentTokenStrategy.constructor.name,);

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
    if (!currentHasher) {
        logger.error('[Core] hasher no inicializada');
        throw new Error('FaitAuthLib not initialized');
    }

    logger.debug('[Core] hasher →', currentHasher.constructor.name,);

    return currentHasher;
}

export function isPasswordHasher(obj: any): obj is PasswordHasher {
  return (
    obj &&
    typeof obj.generateHash === 'function' &&
    typeof obj.verifyHash === 'function'
  )
}