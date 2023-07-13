import express from 'express';
import { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Auth api');
    });

    this.app.use('/api/auth', authRoutes);
  }

  public listen (): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }


}