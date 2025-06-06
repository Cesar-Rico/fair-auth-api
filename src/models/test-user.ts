import { User } from './user'; // Ajusta esta ruta a donde esté tu clase
import bcrypt from 'bcrypt';

const user = new User({
  id: 1,
  user: 'johndoe',
  password: 'SuperSecret123',
  name: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
});

console.log(user.getPasswordHash()); 
console.log(user.verifyPassword('SuperSecret123')); // true
console.log(user.verifyPassword('WrongPassword'));  // false
