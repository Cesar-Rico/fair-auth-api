import { mapUserToUserResponseDto } from '../mappers/userMapper';
import { User } from '../models/user';
import { UserInput } from '../types/user';

let users: User[] = [];


export const registerUser= async (input: UserInput): Promise<User> => {
  const user = await User.create(input)
  users.push(user);
  return user;
};


export const listAllUsers = (): Object => {
  if (users.length === 0) {
        return { message: "No hay usuarios registrados" };
    }
    let activeUsers = users.map(user => {
        return mapUserToUserResponseDto(user);
    });
    return { "users": activeUsers };
}

export const validateUser = async (email: string, password: string ): Promise<boolean> => {
    let userFind: User | undefined = users.find(objUser => objUser.email === email);
   
    if(userFind){
        return await userFind.verifyPassword(password);
    }
    return false;
}