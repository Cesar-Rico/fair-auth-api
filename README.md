# fair-auth-lib

Librería plug & play para autenticación en Node.js con TypeScript.  
Incluye generación y validación de tokens JWT, validaciones de usuario, manejo de errores personalizados y soporte multilenguaje.

---

## 📦 Instalación

```bash
npm install fair-auth-lib
```

---

## 🚀 Uso básico

### 🔐 Crear usuario

```ts
import { createUser } from 'fair-auth-lib';

const result = await createUser({
  name: 'Juan Pérez',
  user: 'juan123',
  password: 'MiSecreto123!',
  email: 'juan@example.com'
});

console.log(result); // { id, username, email, ... }
```

---

### 🔓 Iniciar sesión

```ts
import { loginUser } from 'fair-auth-lib';

const login = await loginUser('juan@example.com', 'MiSecreto123!');
console.log(login); // { id, username, token, method }
```

---

### 🔑 Validar token

```ts
import { getTokenStrategy } from 'fair-auth-lib';

const strategy = getTokenStrategy();
const data = await strategy.validateToken(token);
console.log(data); // Datos del usuario decodificados
```

---

### ✅ Validar datos del usuario

```ts
import { validarDatosUsuario } from 'fair-auth-lib';

const error = validarDatosUsuario({
  name: '',
  user: 'juan123',
  password: '123',
  email: 'no-es-email'
});

if (error) {
  console.log('Error:', error);
}
```

---

### 🌍 Soporte multilenguaje

```ts
import { setLang } from 'fair-auth-lib';

setLang('es'); // Idioma por defecto: 'es'. También puedes implementar 'en', etc.
```

---

## ⚙️ Configuración de entorno

Asegúrate de tener un archivo `.env` con al menos la siguiente variable:

```
JWT_SECRET=clave-super-secreta
```

---

## 🧪 Tests

```bash
npm run test
```

---

## 📁 Estructura recomendada del proyecto

```
.
├── src/
│   ├── auth/
│   ├── config/
│   ├── core/
│   ├── dtos/
│   ├── errors/
│   ├── i18n/
│   ├── mappers/
│   ├── models/
│   ├── services/
│   ├── types/
│   └── utils/
├── dist/
├── tests/
├── tsup.config.ts
└── index.ts
```

---

## 📤 Exportaciones disponibles

```ts
export {
  createUser,
  loginUser,
  getTokenStrategy,
  validarDatosUsuario,
  ValidationError,
  CustomError,
  setLang,
};
```

---

## 🛠 Scripts importantes

```json
"scripts": {
  "test": "NODE_ENV=test jest",
  "test:watch": "NODE_ENV=test jest --watch",
  "build": "tsup",
  "start": "node dist/index.js",
  "prepare": "npm run build"
}
```

---

## 📦 Publicar

1. Asegúrate de compilar:
   ```bash
   npm run build
   ```

2. Publica:
   ```bash
   npm publish
   ```

> ⚠️ Verifica que tu `package.json` tenga correctamente:
```json
{
  "name": "fair-auth-lib",
  "version": "1.0.0",
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.mjs"
    }
  },
  "files": ["dist"]
}
```

---

## 🪪 Licencia

ISC