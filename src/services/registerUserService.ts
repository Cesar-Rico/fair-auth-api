import { User } from '../models/user';
import { UserInput } from '../types/user';

let users: User[] = [];


export const registerUser= async (input: UserInput): Promise<User> => {
  const user = await User.create(input)
  users.push(user);
  return user;
};


export const listAllUsers = (): User[] => {
  return users;
}
