// src/tests/user.test.ts

import { User } from '../models/user';

describe('User Class', () => {
  it('should hash password and verify it correctly', async () => {
    const user = await User.create({
      user: 'johndoe',
      password: 'MyPass123!',
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: 1,
    });

    expect(await user.verifyPasswordStrategy('MyPass123!')).toBe(true);
    expect(await user.verifyPasswordStrategy('WrongPassword')).toBe(false);
  });

  it('should auto-increment IDs', async () => {
    const user1 = await User.create({
    user: 'johndoe1',
    password: 'MyPass123!',
    name: 'John',
    lastName: 'Doe',
    email: 'john1@example.com',
    status: 1,
  });
    const user2 = await User.create({
    user: 'johndoe2',
    password: 'MyPass456!',
    name: 'Johnny',
    lastName: 'Doeman',
    email: 'john2@example.com',
    status: 1,
  });

    expect(user2.id).toBe(user1.id + 1);
  });
});
