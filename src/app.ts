import express, { Request, Response } from 'express';
import userRoutes from 'routes/authRoute';
import cors from 'cors';
import dotenv from 'dotenv';
import { InitFairAuthLibOptions } from 'config/initFairAuthLib';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

app.use('/users', userRoutes);

InitFairAuthLibOptions({
    tokenStrategy: {
      type: 'jwt',
      config: {
        secret: 'pruebita-secret',
        expiresIn: '1M'
      }
    },
    hasher: {
      
      type: 'bcrypt',
      config: {
        saltRounds: 10
      }
      
      /*
      type: 'argon2',
      config: {
        memoryCost: 2 ** 16, // 64 MB
        timeCost: 3,
        parallelism: 1,
        hashLength: 32,
        saltLength: 16
      }
      */
      /*
      type: 'scrypt',
      config: {
        N: 16384, // CPU/memory cost
        r: 8, // Block size
        p: 1, // Parallelization factor
        dkLen: 64, // Length of the derived key
        maxmem: 64 * 1024 * 1024 // Maximum memory usage in bytes (64 MB)
      }
      */
      /*
      generateHash: async (data: string) => {
        // Implement your hashing logic here
        return `hashed-${data}`;
      },
      verifyHash: async (data: string, hash: string) => {
        // Implement your hash verification logic here
        return hash === `hashed-${data}`;
      }
      */
    }
  });
export default app;
