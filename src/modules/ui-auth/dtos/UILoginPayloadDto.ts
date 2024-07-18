import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UiTokenPayloadDto } from './UiTokenPayloadDto';

export class UILoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: UiTokenPayloadDto })
  token: UiTokenPayloadDto;

  constructor(user: UserDto, token: UiTokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
