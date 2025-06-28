export const isDevModeEnabled = (): boolean => {
  const enabled = process.env.NODE_ENV !== 'production' && process.env.DEBUG_MODE === 'true';

  // Warn if inconsistent
  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    console.warn('[WARNING] DEBUG_MODE should not be enabled in production');
  }

  return enabled;
};

export function timeZoneConfig(): string {
  return new Date().toLocaleString('es-PE', {
    timeZone : 'America/Lima',
    year  : 'numeric',
    month : '2-digit',
    day   : '2-digit',
    hour  : '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}