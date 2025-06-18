import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.js';

const router = Router();
const authController = new AuthController();
const userController = new UserController();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Inscription d’un nouvel utilisateur (rôle user)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: supersecret
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/signup', (req, res) => authController.signup(req, res));

/**
 * @swagger
 * /users/signup/admin:
 *   post:
 *     summary: Création d’un nouvel administrateur (rôle admin)
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bob
 *               email:
 *                 type: string
 *                 example: bob@example.com
 *               password:
 *                 type: string
 *                 example: supersecret
 *               role:
 *                 type: string
 *                 enum: [admin]
 *                 example: admin
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (droit insuffisant)
 */
router.post('/signup/admin', verifyToken, (req, res) => authController.signup(req, res));

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion d’un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: supersecret
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', (req, res) => authController.login(req, res));

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Liste tous les utilisateurs (admin uniquement)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (droit insuffisant)
 */
router.get('/', verifyToken, checkRole('admin'), (req, res) => userController.getAll(req, res));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID (admin uniquement)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (droit insuffisant)
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', verifyToken, checkRole('admin'), (req, res) => userController.getOne(req, res));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID (admin uniquement)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin, moderator]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (droit insuffisant)
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:id', verifyToken, checkRole('admin'), (req, res) => userController.update(req, res));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID (admin uniquement)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (droit insuffisant)
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', verifyToken, checkRole('admin'), (req, res) => userController.remove(req, res));

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 */