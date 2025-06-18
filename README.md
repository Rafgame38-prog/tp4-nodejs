# TP4

## Objectif

Ce projet met en place un système d’authentification pour une API REST, avec gestion des rôles (`user`, `admin`, `moderator`).  
Il sécurise l’accès à certaines routes selon le role de l’utilisateur.

## Fonctionnalités

- **Inscription** (`POST /users/signup`) avec hachage du mot de passe (`bcrypt`)
- **Connexion** (`POST /users/login`) avec génération d’un JWT (24h)
- **Gestion des rôles** (`user`, `admin`, `moderator`)
- **Middleware** de vérification du JWT et du rôle
- **CRUD Utilisateur** (admin uniquement)
- **Connexion à MongoDB** via Mongoose

---

## Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Rafgame38-prog/tp4-nodejs.git
   cd tp4-nodejs/

   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer un fichier `.env` à la racine**
   ```
   MONGO_URI=mongodb://localhost:27017/nom_de_votre_bdd
   JWT_SECRET=uneSuperCleSecrete
   PORT=3000
   PASSWORD=Jds7TUS82qgOZUMC

   ```

4. **Lancer le serveur**
   ```bash
   npm run start
   ```
  

---

## Exemples de requêtes API

### Inscription (user)
```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"supersecret"}'
```

### Connexion
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"supersecret"}'
```

### Accès à une route protégée (ex: liste des utilisateurs — admin uniquement)
```bash
curl -X GET http://localhost:3000/users/ \
  -H "Authorization: Bearer VOTRE_TOKEN_Ici"
```

---
#### Il est possible d'utiliser swagger avec l'url suivante http://localhost:3000/api-docs

## Structure du projet

```
config/
  db.js              # Connexion MongoDB
controllers/
  auth.controller.js # Authentification (signup, login)
  user.controller.js # CRUD utilisateur
middlewares/
  auth.js            # Middleware JWT et rôles
models/
  User.js            # Modèle utilisateur (Mongoose)
routes/
  userRouter.js      # Routes utilisateurs & auth
services/
  user.service.js    # Logique métier utilisateur
  auth.service.js    # Logique métier auth
server.js            # Point d’entrée de l’API
.env                 # Variables d’environnement
initAdmin.js         # Création d'un super utilisateur
swagger.js           # Pour la documentation
```

---

## Notes

- **Création d’un admin** : seul un admin connecté peut créer un autre admin.
- **Rôle par défaut** : `user`.
- **Mot de passe** : min. 8 caractères, toujours haché.
- **Token JWT** : transmis dans l’en-tête `Authorization: Bearer <token>`.
- **Sécurité** : pensez à ne jamais exposer le champ `password` dans les réponses API.

---

## Auteur

- Rafik BOUCHENNA