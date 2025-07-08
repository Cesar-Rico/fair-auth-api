import { getTokenStrategy } from "config/initFairAuthLib";
import { LoginResponseDTO } from "dtos/loginDto";
import { User } from "models/user";
import { validateUser } from "services/userService";

export const loginUser = async (email: string, password: string): Promise<LoginResponseDTO | null> => {
    const userFind: User | null = await validateUser(email, password);
    if(!userFind) return null;

    const token = await getTokenStrategy().generateToken({
        id: userFind.id,
        username: userFind.user
    })
    return {
      id: userFind.id,
      username: userFind.user,
      token: token,
      method: 'password'
    }
}