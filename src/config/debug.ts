// Valor por defecto: lee variables de entorno
let debugMode = process.env.DEBUG_MODE === 'true' ||
                (process.env.NODE_ENV !== 'production');

/** Lee el estado actual */
export const isDebugMode = () => debugMode;

/**
 * Activa / desactiva logs extendidos en caliente.
 * ¡NO llames a esto en producción salvo que sepas lo que haces!
 */
export function debugModeToggle(enabled: boolean): void {
  debugMode = enabled;
  console.log(`[DebugMode] ahora está ${enabled ? '🟢 ON' : '🔴 OFF'}`);
}
