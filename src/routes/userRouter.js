import { getAllUser, createUser, findUserById, updateUserById, removeUser } from '../controllers/userController.js';
import { Router } from 'express';
const router = Router();

router.get('/', getAllUser);
router.post('/', createUser);
router.get('/:id', findUserById);
router.put('/:id', updateUserById);
router.delete('/:id', removeUser);

export default router;
