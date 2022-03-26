import { userLogin } from '../controllers/loginController.js';
import { Router } from 'express';
const router = Router();

router.post('/login', userLogin);

export default router;
