import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UiUserLoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
