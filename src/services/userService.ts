import { UserResponseDTO } from 'dtos/userDto';
import { mapUserToUserResponseDto } from '../mappers/userMapper';
import { User } from '../models/user';
import { UserInput } from '../types/user';

let users: User[] = [];


export const registerUser= async (input: UserInput): Promise<User> => {

    const exists = users.find((u) => u.user === input.user || u.email === input.email);
    if (exists) {
        throw new Error('User or email already exists');
    }
    const user = await User.create(input)
    users.push(user);
    return user;
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