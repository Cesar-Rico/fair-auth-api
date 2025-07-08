import { validatePassword } from "utils/validations";

interface PasswordValidationResult {
    valid: boolean,
    observation?: string
}

export const validatePasswordController = async (password: string): Promise<PasswordValidationResult> => {
  try{
    const obs = await validatePassword(password);
    if (obs){
        return {
            valid: false,
            observation: obs
        }
    }
    return {
        valid: true
    }
  }catch (error) {
    return {
        valid: false,
        observation: (error as Error).message
    }
  }
}
