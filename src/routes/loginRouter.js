import { userLogin } from '../controllers/loginController.js';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user reachable api
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login api for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/login', userLogin);

export default router;
