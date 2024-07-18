import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { UiAuthService } from './ui-auth.service';
import { UiJwtStrategy } from './ui-jwt.strategy';
import { SharedModule } from 'shared/shared.module';
import { UiPublicStrategy } from './ui-public.strategy';
import { UiAuthController } from './ui-auth.controller';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiConfigService } from 'shared/services/api-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.privateKey,
        publicKey: configService.authConfig.publicKey,
        signOptions: {
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [UiAuthController],
  providers: [UiAuthService, UiJwtStrategy, UiPublicStrategy, ApiConfigService],
  exports: [JwtModule, UiAuthService],
})
export class UiAuthModule {}
