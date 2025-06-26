import app from './app';
import { bootstrap } from './bootstrap';

const PORT = process.env.PORT || 3000;

(async () => {
  await bootstrap();                 

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`),
    );
  }
})();
