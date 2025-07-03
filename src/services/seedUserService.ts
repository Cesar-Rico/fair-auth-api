import { registerUser } from './userService'; // o el path correcto
import { SeedUserInput } from 'dtos/seedUserDto';
import { generateRandomUser } from '../utils/generateRandomUser';
import { isDevModeEnabled } from '../config/config'; // una función que detecte si debugMode está activo
import { UserInput } from 'types/user';
import { logger } from '../utils/logger';

export async function seedUsers(data?: SeedUserInput[] | number): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    logger.warn('[Seed] seedUsers está deshabilitado en producción.');
    return;
  }

  const usersToSeed: SeedUserInput[] =
    typeof data === 'number'
      ? Array.from({ length: data }, () => generateRandomUser())
      : (data ?? []);

  logger.info(`[Seed] Generando ${usersToSeed.length} usuarios de prueba`);
  
  for (const input of usersToSeed) {
    try {
      // Validar campos obligatorios antes de pasar como UserInput
      if (!input.user || !input.email) {
        logger.error('[Seed] Faltan campos obligatorios (user o email)', input);
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

      if (process.env.DEBUG_MODE === 'true') {                      // 👈 solo con DEBUG_MODE=true
        logger.debug('[Seed] registrando', userInput);
      }

      const user = await registerUser(userInput);
      logger.info(`[Seed] Usuario creado  -> ${user.user} (${user.email})`);

      if (isDevModeEnabled()) {
        console.log(`Usuario registrado: ${user.user} (${user.email}) - password: ${userInput.password}`);
      }

    } catch (error) {
      if (isDevModeEnabled()) {
        logger.error('[Seed] Error registrando usuario', {input, error: (error as Error).message,});
        //console.warn(`Error registrando usuario ${input.email || input.user}:`, error);
      }
    }
  }
  logger.info('[Seed] Proceso de seed finalizado');
}