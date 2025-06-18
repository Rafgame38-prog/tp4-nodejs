import { UserService } from '../services/user.service.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAll(req, res) {
    try {
      const users = await this.userService.findAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  async getOne(req, res) {
    try {
      const user = await this.userService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  async update(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  async remove(req, res) {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json({ message: 'Utilisateur supprimé.' });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
