import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { PageDto } from 'src/common/dtos/page.dto';
import { Auth } from 'src/decorators/http.decorators';
import { UserPageOptionsDto } from './dtos/user-page-options.dto';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllUsers(
    @Query() userPageOptionsDto: UserPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    return this.userService.getAllUsers(userPageOptionsDto);
  }
}
