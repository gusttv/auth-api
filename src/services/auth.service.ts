import { prisma } from '../database/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';
import { User } from '@prisma/client';


export class AuthService {
  public async registerUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;                         
  }

  public async loginUser(username: string, password: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  public async updateUser(userId: number, username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  }
}
