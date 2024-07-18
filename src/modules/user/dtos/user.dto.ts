import { ApiPropertyOptional } from '@nestjs/swagger';

import { GenderEnum } from 'src/enums/gender.enum';
import { AbstractDto } from 'src/common/dtos/abstract.dto';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { UserEntity } from 'src/database/entities/user.entity';
import { DateFieldOptional, EnumFieldOptional } from 'src/decorators';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  @ApiPropertyOptional()
  status?: UserStatusEnum;

  @EnumFieldOptional(() => GenderEnum)
  gender?: GenderEnum;

  @DateFieldOptional()
  dateOfBirth?: string;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.isActive = user.isAvtive;
    this.status = user.status;
    this.gender = user.gender;
    this.dateOfBirth = user.dateOfBirth;
  }
}
