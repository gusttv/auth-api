import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';


export class AuthMiddleware {

  public static authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      res.status(401).json({ error: 'Missing token' });
      return;
    }

    // Bearer token
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Missing token' });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      req.body.user = decoded;
      console.log('Authenticated user', req.body.user);
    
      next();
    });
  };
}



