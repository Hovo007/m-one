import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UiModule } from './modules/ui.module';
import { SharedModule } from 'shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { ApiConfigService } from 'shared/services/api-config.service';

@Module({
  imports: [
    UiModule,
    DatabaseModule,
    RouterModule.register([
      {
        path: 'ui',
        module: UiModule,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
