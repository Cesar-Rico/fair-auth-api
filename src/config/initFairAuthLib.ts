import { JwtTokenStrategy, JwtTokenConfig } from "../core/token/JwtTokenStrategy";
import { TokenStrategy } from "../core/token/TokenStrategy";

const isDev = process.env.NODE_ENV !== 'production';
const DEFAULT_SECRET = isDev ? 'secret-key-default': undefined;

interface InitFairAuthLibOptions {
  tokenStrategy?: TokenStrategy | {type: 'jwt', config: JwtTokenConfig}
}

let currentTokenStrategy: TokenStrategy;

export function InitFairAuthLibOptions(options: InitFairAuthLibOptions = {}) {
    if (!options.tokenStrategy){
        const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
        if(!secret) throw new Error("JWT_SECRET is required in production.");
        currentTokenStrategy = new JwtTokenStrategy( { secret: secret, expiresIn: '1M'})
    } else if('type' in options.tokenStrategy && options.tokenStrategy.type === 'jwt'){
        currentTokenStrategy = new JwtTokenStrategy(options.tokenStrategy.config);
    } else if(isTokenStrategy(options.tokenStrategy)) {
        currentTokenStrategy = options.tokenStrategy;
    } else {
        throw new Error('Invalid tokenStrategy');
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