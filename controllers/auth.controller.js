import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export class AuthController {
  async signup(req, res) {
    try {
      const { name, email, password, role } = req.body;
      if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
        return res.status(403).json({ message: "Seul un admin peut creer un admin." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur cree !' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.json({ userId: user._id, role: user.role, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
