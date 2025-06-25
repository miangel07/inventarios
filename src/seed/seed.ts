// src/seed/seed.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.develop.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserSeeder } from './users.seed';
import { RoleSeeder } from './Role.seed';
import { BusinessSeeder } from './Business.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const roleSeeder = app.get(RoleSeeder);
  const business = app.get(BusinessSeeder);
  const userSeeder = app.get(UserSeeder);

  await roleSeeder.run();
  await business.run();
  await userSeeder.run();

  await app.close();
}

bootstrap();
