import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('typeorm', ():TypeOrmModuleOptions => ({
  type: "mysql",
  host: process.env.DB_HOST,
  port: (process?.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
}));