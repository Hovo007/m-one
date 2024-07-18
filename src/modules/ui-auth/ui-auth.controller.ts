import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from 'src/decorators';
import { UserDto } from '../user/dtos/user.dto';
import { UiAuthService } from './ui-auth.service';
import { UserService } from '../user/user.service';
import { Auth } from 'src/decorators/http.decorators';
import { UiUserLoginDto } from './dtos/UiUserLoginDto';
import { UILoginPayloadDto } from './dtos/UILoginPayloadDto';
import { UiUserRegisterDto } from './dtos/UiUserRegisterDto';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller()
@ApiTags('ui-auth')
export class UiAuthController {
  constructor(
    private userService: UserService,
    private authService: UiAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UILoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UiUserLoginDto,
  ): Promise<UILoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
    });

    return new UILoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UiUserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);
    return createdUser.toDto();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
