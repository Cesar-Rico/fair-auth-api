// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,            // Generar .d.ts
  sourcemap: true,      // Útil para debugging
  clean: true,          // Limpia /dist antes de construir
  minify: false,        // Si quieres minificar, pon true
  outDir: 'dist',
});