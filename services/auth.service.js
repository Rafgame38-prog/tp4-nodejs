import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from './UserService.js';

export class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  async signup({ name, email, password, role = 'user' }) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilise.');
    }
    return await this.userService.createUser({ name, email, password, role });
  }

  async login(email, password) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return { userId: user._id, role: user.role, token };
  }
}
