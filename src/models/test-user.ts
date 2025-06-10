import { User } from './user'; // Ajusta esta ruta a donde esté tu clase

(async () => {
  const user = await User.create({
    user: 'johndoe',
    password: 'SuperSecret123',
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  });

  console.log('Hash:', user.getPasswordHash());
  console.log('✅ Correct:', await user.verifyPassword('SuperSecret123'));
  console.log('❌ Wrong:', await user.verifyPassword('WrongPass'));
})();
