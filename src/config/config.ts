export const isDevModeEnabled = (): boolean => {
  const enabled = process.env.NODE_ENV !== 'production' && process.env.DEBUG_MODE === 'true';

  // Warn if inconsistent
  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    console.warn('[WARNING] DEBUG_MODE should not be enabled in production');
  }

  return enabled;
};
