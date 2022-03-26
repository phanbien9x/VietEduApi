import { getAllUser, createUser, findUserById, updateUserById, removeUser } from '../controllers/userController.js';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: int 10
 *           description: The auto-generated id
 *         username:
 *           type: varchar 60
 *           description: The user username
 *         password:
 *           type: varchar 100
 *           description: The user password
 *         access_token:
 *           type: varchar 100
 *           description: The user access_token
 *       example:
 *         username: VietEdu
 *         password: md5 encode
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The admin manage api
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
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
router.post('/', createUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all the user
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getAllUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/:id', findUserById);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id', updateUserById);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/:id', removeUser);

export default router;
