import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 📸 Aumentar límite de carga para fotos de medicina (Base64)
  const bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '15mb' }));
  app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

  app.enableCors({
    origin: true,
    credentials: true,
  });


  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Backend de Pastibot corriendo en el puerto http://localhost:${port} Perrito =)`);
}
bootstrap();
