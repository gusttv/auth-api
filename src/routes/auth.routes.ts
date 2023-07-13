import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const authController = new AuthController();

//  Auth Routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

//  Change pass and user
router.put('/user', AuthMiddleware.authenticateJWT, authController.updateUser);

export default router;
