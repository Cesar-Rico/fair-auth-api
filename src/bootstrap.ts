// src/bootstrap.ts
import { seedUsers } from 'services/seedUserService';
import { isDevModeEnabled } from 'config/config';

/**
 * Ejecuta tareas de arranque solo en desarrollo / debug.
 * Actualmente: genera 10 usuarios de prueba (o el número que quieras).
 */
export async function bootstrap(): Promise<void> {
  if (process.env.NODE_ENV !== 'production' && isDevModeEnabled()) {
    try {
      await seedUsers(10);
      console.log('10 usuarios de prueba generados al arrancar');
    } catch (err) {
      console.warn('Error generando usuarios de prueba:', err);
    }
  }
}
