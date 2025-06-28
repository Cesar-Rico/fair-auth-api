import { isDebugMode } from 'config/debug';
import { timeZoneConfig } from 'config/config';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function log(level: LogLevel, ...msg: unknown[]) {
  if (level === 'debug' && !isDebugMode()) return;  // silenciar debug
  //const ts = new Date().toISOString();
  const ts = timeZoneConfig();
  console[level === 'debug' ? 'log' : level](`[${ts}] [${level}]`, ...msg);
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