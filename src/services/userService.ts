import { UserResponseDTO, UserVerifyDTO } from 'dtos/userDto';
import { mapUserToUserResponseDto } from '../mappers/userMapper';
import { User } from '../models/user';
import { UserInput } from '../types/user';
import { logger } from '../utils/logger';

let users: User[] = [];


export const registerUser= async (input: UserInput): Promise<User> => {

    logger.info('[registerUser] intento de alta para', input.user);
    logger.debug('[registerUser] payload recibido:', input);   // debug detallado

    const exists = users.find((u) => u.user === input.user || u.email === input.email);
    if (exists) {
        logger.warn('[registerUser] duplicado detectado (user="', input.user, '" email="', input.email, '")');
        throw new Error('User or email already exists');
    }
    // ---- creación real -------------------------------------------------------
    try {
        const user = await User.create(input);
        users.push(user);

        logger.info('[registerUser] usuario registrado OK ⇒',user.user,"<",user.email,">");
        //logger.debug('[registerUser] objeto devuelto:', {...user, passwordHash: user.passwordHash.slice(0, 8) + '…',});
        logger.debug('[registerUser] objeto devuelto:', {...user,});

        return user;
    } catch (err) {
        logger.error('[registerUser] fallo creando usuario', err);
        throw err;               // re-lanzo para que lo capture la capa caller
    }
};


export const listAllUsers = (): UserResponseDTO[] => {
    logger.debug('listAllUsers() invocado');
    let activeUsers: UserResponseDTO[] = [];
    logger.info(`Total usuarios en memoria: ${users.length}`);
    for (const user of users) {
        activeUsers.push(mapUserToUserResponseDto(user));
    }
    logger.debug('Usuarios activos mapeados:', activeUsers.length);
    return activeUsers;
}

export const validateUser = async (email: string, password: string ): Promise<User | null> => {
    logger.debug('validateUser() llamado', { email });
    let userFind: User | undefined = users.find(user => user.email === email);
    if(!userFind){
        logger.info(`Intento de login con email inexistente: ${email}`);
        return null;
    } 
    //return (await userFind.verifyPasswordStrategy(password)) ? userFind : null;

    const ok = await userFind.verifyPasswordStrategy(password);

    logger[ok ? 'info' : 'warn'](
        `Login ${ok ? 'exitoso' : 'fallido'} para ${userFind.user} (${email})`
    );

    return ok ? userFind : null;
}

export const verifyUsernameAvailabilityService = async (user: UserVerifyDTO): Promise<User | null> => {
    logger.debug('verifyUsernameAvailabilityService()', { user: user.user });

    const userFind = users.find(u => u.user === user.user);
    if (!userFind) {
        logger.info(`Username disponible: ${user.user}`);
        return null;
    }
    logger.warn(`Username YA existe: ${user.user}`);
    return userFind;
}