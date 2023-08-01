import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const authController = new AuthController();

//  rotas de autenticação
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

//  mudança de senha e de usuário
router.put('/user', AuthMiddleware.authenticateJWT, authController.updateUser);

export default router;
