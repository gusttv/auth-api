import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const usernameRegex = /^([a-zA-Z0-9]{3,15})$/;
      const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{3,10}$/;

      const usernameMatch = usernameRegex.test(username);
      const passwordMatch = passwordRegex.test(password);

      if (!usernameMatch) {
        res.status(400).json({ 
          error: 
          'Username must contain only letters, numbers and must be 3 and 15 characters.' });
      }

      if (!passwordMatch) {
        res.status(400).json({ 
          error: 
          'Password must contain at least one uppercase character and must be 3 and 10 chacatcters.' });
      }  

      const user = await authService.registerUser(username, password);
      res.status(201).json(user);

    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const token = await authService.loginUser(username, password);
      if (token) {
        res.json({ token });
        return;
      } 
      res.status(401).json({ error: 'Invalid username or password' });
      return;
      
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user;
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required for updating user.' });
        return;
      }

      // Add authentication check before updating user
      if (userId !== req.body.user.userId) {
        res.status(401).json({ error: 'Unauthorized: You are not allowed to update this user.' });
        return;
      }

      const user = await authService.updateUser(userId, username, password);
      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
}

