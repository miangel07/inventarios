// src/seed/seed.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.develop.env' }); // 👈 Esto debe estar antes de todo

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserSeeder } from './users.seed';
import { RoleSeeder } from './Role.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const roleSeeder = app.get(RoleSeeder);
  const userSeeder = app.get(UserSeeder);

   await roleSeeder.run();
  await userSeeder.run();

  await app.close();
}

bootstrap();
