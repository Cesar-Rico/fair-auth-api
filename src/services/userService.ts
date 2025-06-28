import { UserResponseDTO, UserVerifyDTO } from 'dtos/userDto';
import { mapUserToUserResponseDto } from '../mappers/userMapper';
import { User } from '../models/user';
import { UserInput } from '../types/user';
import { logger } from '../utils/logger';

let users: User[] = [];


export const registerUser= async (input: UserInput): Promise<User> => {

    logger.info('[registerUser] intento de alta para "%s"', input.user);
    logger.debug('[registerUser] payload recibido:', input);   // debug detallado

    const exists = users.find((u) => u.user === input.user || u.email === input.email);
    if (exists) {
        logger.warn('[registerUser] duplicado detectado (user="%s", email="%s")', input.user, input.email,);
        throw new Error('User or email already exists');
    }
    // ---- creación real -------------------------------------------------------
    try {
        const user = await User.create(input);
        users.push(user);

        logger.info('[registerUser] usuario registrado OK ⇒ %s <%s>', user.user, user.email,);
        //logger.debug('[registerUser] objeto devuelto:', {...user, passwordHash: user.passwordHash.slice(0, 8) + '…',});
        logger.debug('[registerUser] objeto devuelto:', {...user,});

        return user;
    } catch (err) {
        logger.error('[registerUser] fallo creando usuario', err);
        throw err;               // re-lanzo para que lo capture la capa caller
    }
};


export const listAllUsers = (): UserResponseDTO[] => {
    let activeUsers: UserResponseDTO[] = [];
    for (const user of users) {
        activeUsers.push(mapUserToUserResponseDto(user));
    }
    return activeUsers;
}

export const validateUser = async (email: string, password: string ): Promise<User | null> => {
    let userFind: User | undefined = users.find(user => user.email === email);
    if(!userFind) return null;
    return (await userFind.verifyPasswordStrategy(password)) ? userFind : null;
}

export const verifyUsernameAvailabilityService = async (user: UserVerifyDTO): Promise<User | null> => {
    const userFind = users.find(u => u.user === user.user);
    if (!userFind) return null;
    return userFind;
}