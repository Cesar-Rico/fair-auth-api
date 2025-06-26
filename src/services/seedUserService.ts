import { registerUser } from './userService'; // o el path correcto
import { SeedUserInput } from 'dtos/seedUserDto';
import { generateRandomUser } from '../utils/generateRandomUser';
import { isDevModeEnabled } from '../config/config'; // una función que detecte si debugMode está activo
import { UserInput } from 'types/user';

export async function seedUsers(data?: SeedUserInput[] | number): Promise<void> {
  if (process.env.NODE_ENV === 'production' || !isDevModeEnabled()) {
    console.log('seedUsers está deshabilitado en producción.');
    return;
  }

  const usersToSeed: SeedUserInput[] =
    typeof data === 'number'
      ? Array.from({ length: data }, () => generateRandomUser())
      : (data ?? []);

  for (const input of usersToSeed) {
    try {
      // Validar campos obligatorios antes de pasar como UserInput
      if (!input.user || !input.email) {
        throw new Error('Faltan campos obligatorios: user o email');
      }

      const userInput: UserInput = {
        user: input.user, // Now guaranteed to be string
        email: input.email,
        password: input.password ?? 'Test123!',
        name: input.name ?? '',
        lastName: input.lastName ?? '',
        status: input.status ?? 1,
      };

      const user = await registerUser(userInput);

      if (isDevModeEnabled()) {
        console.log(`Usuario registrado: ${user.user} (${user.email}) - password: ${userInput.password}`);
      }

    } catch (error) {
      if (isDevModeEnabled()) {
        console.warn(`Error registrando usuario ${input.email || input.user}:`, error);
      }
    }
  }
}