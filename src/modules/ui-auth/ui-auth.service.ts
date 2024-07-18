import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { validateHash } from 'src/common/utils';
import { UserService } from '../user/user.service';
import { TokenType } from 'src/constants/token-type';
import { UiUserLoginDto } from './dtos/UiUserLoginDto';
import { UiTokenPayloadDto } from './dtos/UiTokenPayloadDto';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiConfigService } from 'shared/services/api-config.service';
import { WrongCredentialsException } from 'src/exceptions/user/wrong-credentials.exception';

@Injectable()
export class UiAuthService {
  constructor(
    private userService: UserService,
    private configService: ApiConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UiUserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsException();
    }

    return user!;
  }

  async createAccessToken(data: {
    userId: number;
  }): Promise<UiTokenPayloadDto> {
    return new UiTokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
  }
}
