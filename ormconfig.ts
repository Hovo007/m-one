import './shared/query-builder.extension.ts:'


import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserSubscriber } from 'src/database/entity-subscribers/user-subscriber';

dotenv.config();


export const dataSource : TypeOrmModuleOptions = ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  subscribers: [UserSubscriber],
  migrationsRun: true,
  entities: [
    'dist/src/database/**/*.entity{.ts,.js}',
  ],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
});