// src/bootstrap.ts
import { seedUsers } from 'services/seedUserService';
import { debugModeToggle } from 'config/debug';
import { logger } from 'utils/logger';

/**
 * Ejecuta tareas de arranque solo en desarrollo / debug.
 * Actualmente: genera 10 usuarios de prueba (o el número que quieras).
 */
export async function bootstrap(): Promise<void> {

  // Lee la env var DEBUG_MODE=true|false
  debugModeToggle(process.env.DEBUG_MODE === 'true');
  logger.info(`[Bootstrap] DEBUG_MODE = ${process.env.DEBUG_MODE}`);

  if (process.env.NODE_ENV !== 'production') {
    logger.info('[Bootstrap] Sembrando 10 usuarios de prueba…');
    try {
      await seedUsers(10);
      logger.info('[Bootstrap] 10 usuarios de prueba generados al arrancar');
    } catch (err) {
      logger.error('[Bootstrap] Error generando usuarios de prueba', err);
    }
  }else {
    logger.warn('[Bootstrap] Entorno producción: se omite seedUsers');
  }
}
