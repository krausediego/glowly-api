import 'express-async-errors';
import express from 'express';
import { readdirSync } from 'node:fs';
import { Server } from 'node:http';
import path from 'node:path';

import env from '@/main/config/environments/application';

export class App {
  public readonly app: express.Express;

  public server: Server;

  constructor() {
    this.app = express();
  }

  getApp(): App {
    return this;
  }

  setupEnvironment(): App {
    this.app.use(express.json());
    return this;
  }

  errorHandler(
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): express.Response {
    if (env.mode !== 'development' && !!(error as any)?.statusCode) {
      return res.status((error as any)?.statusCode ?? 400).json({
        error: error?.message ?? 'unknown',
      });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  setupRoutes(): App {
    const router = express.Router();
    this.app.get('/', (_, res) => res.status(200).send('ok'));
    router.get('/', (_, res) => res.status(200).send('ok'));

    this.app.use('/api', router);
    const routesPath = path.resolve(__dirname, '../routes');
    readdirSync(routesPath)
      .filter(file => !file.endsWith('.map'))
      .forEach(async file => {
        (await import(`${routesPath}/${file}`)).default(router);
      });

    this.app.use(this.errorHandler.bind(this));
    return this;
  }

  disconnect(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.server.close(() => {
        console.log('Server shutdown...');
        resolve(true);
      });
    });
  }

  listen(port: number): void {
    this.server = this.app.listen(port, () => {
      console.log(`⚡️ App listen on port ${port}.`);
    });
  }
}

export default new App().setupEnvironment().setupRoutes();
