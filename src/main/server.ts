import '@/main/config/dotenv';

import env from '@/main/config/environments/application';

import { App } from './config/app';

class ServerSetup {
  private app!: App;

  public async start() {
    this.app = (await import('./config/app')).default;
    this.app.listen(env.port);
  }

  public async stop() {
    await this.app.disconnect();
    process.exitCode = 1;
  }
}

const serviceSetup = new ServerSetup();
serviceSetup.start();

process.on('SIGTERM', async () => {
  await serviceSetup.stop();
});
