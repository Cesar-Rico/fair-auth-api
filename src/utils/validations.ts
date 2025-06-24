import { messages } from "../i18n/messages";
import { UserDTO } from "dtos/userDto";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const lang = 'es';

export const validarDatosUsuario = (user: UserDTO): string | null => {
    const msg = messages[lang];
    if(!user.name || typeof user.name !== 'string'){
        return msg.requiredName;
    }
    if(!user.user || typeof user.user !== 'string'){
        return msg.requiredUsername;
    }
    if(!user.password || typeof user.password !== 'string'){
        return msg.requiredPassword;
    }
    if(!user.email || typeof user.email !== 'string' || !isValidEmail(user.email)){
        return msg.requiredEmail;
    }
    return null;
}
const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  const msg = messages[lang];
  if (password.length < 8) {
    return msg.passwordLength;
  }
  if (password.length < 64) {
    return msg.maxPasswordLength;
  }
  if (!/[A-Z]/.test(password)) {
    return msg.passwordUppercase;
  }
  if (!/[a-z]/.test(password)) {
    return msg.passwordLowercase;
  }
  if (!/[0-9]/.test(password)) {
    return msg.passwordNumber;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return msg.passwordSpecialChar;
  }
  return null;
}