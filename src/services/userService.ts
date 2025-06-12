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
    // Return a list of users without passwords
    let usersWithoutPasswords = users.map(user => ({
        id: user.id,
        user: user.user,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        token: user.token,
        ip: user.ip
    }));
    // Return the list of users
    let activeUsers = usersWithoutPasswords.filter(user => user.status === 1);
    // If no active users, return a 404 status
    /*
    if (activeUsers.length === 0) {
        return res.status(404).json({ message: "No hay usuarios activos" });
    }else {
        return res.status(200).json({ "users": activeUsers });
    }
    */
    return { "users": activeUsers };
}

export const validateUser = async (username: string, password: string ): Promise<boolean> => {
    let userFind: User | undefined = users.find(objUser => objUser.user === username);
   
    if(userFind){
        return await userFind.verifyPassword(password);
    }
    return false;
}