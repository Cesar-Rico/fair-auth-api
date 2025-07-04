import { messages } from "../i18n/messages";
import { UserDTO } from "dtos/userDto";
import { logger } from "./logger";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const lang = 'es';

export const validarDatosUsuario = (user: UserDTO): string | null => {
    const msg = messages[lang];
    logger.debug('[Validaciones] validarDatosUsuario → entrada', user); 
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
    logger.debug('[Validaciones] validarDatosUsuario ✔︎ ok'); 
    return null;
}
const isValidEmail = (email: string): boolean => {
  const ok = emailRegex.test(email);
  logger.debug(`[Validaciones] isValidEmail("${email}") = ${ok}`);
  return ok;
};

export const validatePassword = (password: string): string | null => {
  const msg = messages[lang];
  logger.debug('[Validaciones] validatePassword len=', password.length);
  if (password.length < 8) {
    return msg.passwordLength;
  }
  if (password.length > 64) {
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
  if (!/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) {
    return msg.passwordSpecialChar;
  }
  logger.debug('[Validaciones] validatePassword ✔︎ ok');
  return null;
}