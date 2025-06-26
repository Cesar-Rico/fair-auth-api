// src/utils/generateRandomUser.ts
import { SeedUserInput } from  'dtos/seedUserDto';

export function generateRandomUser(): SeedUserInput {
  const id = Math.floor(Math.random() * 100000);
  return {
    user: `testuser${id}`,
    name: `Name${id}`,
    lastName: `Last${id}`,
    email: `test${id}@mail.com`,
    //password: `Test@1234${id}`,
    password: `Test@1234`,
    status: 1,
  };
}
