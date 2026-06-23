import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const startPort = parseInt(process.env.PORT ?? '3000', 10);
  let port = Number.isFinite(startPort) ? startPort : 3000;
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await app.listen(port);
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${port}`);
      return;
    } catch (err: any) {
      // If port is in use, try next port
      if (err && err.code === 'EADDRINUSE') {
        // eslint-disable-next-line no-console
        console.warn(`Port ${port} in use, trying port ${port + 1}...`);
        port += 1;
        continue;
      }
      throw err;
    }
  }

  throw new Error(
    `Unable to bind to a port after ${maxAttempts} attempts starting from ${startPort}`,
  );
}

bootstrap();
