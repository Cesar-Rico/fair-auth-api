import { isDebugMode } from 'config/debug';
import { timeZoneConfig } from 'config/config';
import { promises as fs } from 'fs';
import { join } from 'path';

/** Carpeta donde se guardarán los logs */
const LOG_DIR = join(process.cwd(), 'logs');

/** Devuelve ruta logs/app-YYYY-MM-DD.log */
function todayLogFile() {
  const d = new Date();
  const iso = d.toISOString().slice(0, 10);  // «2025-06-27»
  return join(LOG_DIR, `app-${iso}.log`);
}

/** Escribe la línea en el archivo (sin bloquear la app) */
async function writeToFile(line: string) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(todayLogFile(), line + '\n', 'utf8');
  } catch (err) {
    // Si falla no rompemos la app — solo lo mostramos una vez
    console.error('✖ log file error:', err);
  }
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function log(level: LogLevel, ...msg: unknown[]) {
    if (level === 'debug' && !isDebugMode()) return;  // silenciar debug
    //const ts = new Date().toISOString();
    const ts = timeZoneConfig();
    const line = `[${ts}] [${level}] ${msg.map(String).join(' ')}`;
    //console[level === 'debug' ? 'log' : level](`[${ts}] [${level}]`, ...msg);
    
    // Consola
    console[level === 'debug' ? 'log' : level](line);

    // Archivo (no esperes al await => sin bloquear)
    writeToFile(line);
}

type AnyMsg = unknown[];

// Atajos cómodos
export const logger = {
  info:  (...m: AnyMsg): void => log('info',  ...m),
  warn:  (...m: AnyMsg): void => log('warn',  ...m),
  error: (...m: AnyMsg): void => log('error', ...m),
  debug: (...m: AnyMsg): void => log('debug', ...m),
};
// Exporta el logger para usarlo en otros módulos
export default logger;