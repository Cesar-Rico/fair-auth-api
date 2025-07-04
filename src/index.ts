import app from './app';
import { bootstrap } from './bootstrap';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

(async () => {
  await bootstrap();
  logger.info('[Index] bootstrap completo');

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () =>{
      logger.info(`[Index] Servidor corriendo en http://localhost:${PORT} (NODE_ENV=${process.env.NODE_ENV})`);   
      //console.log(`Servidor corriendo en http://localhost:${PORT}`),
    });
  }else {
    logger.warn('[Index] modo test: servidor Express no iniciado');
  }

})();
