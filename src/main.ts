import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { SwaggerCustomOptions } from '@nestjs/swagger';
import { promises as fs } from 'fs';
import { parse } from 'yaml';
dotenv.config();
const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  const yamlContent = await fs.readFile('./doc/api.yaml', { encoding: 'utf8' });
  const yamlDocument = parse(yamlContent);
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: { spec: yamlDocument },
  };
  SwaggerModule.setup(`/docs`, app, document, swaggerOptions);

  await app.listen(PORT);
}
bootstrap();
