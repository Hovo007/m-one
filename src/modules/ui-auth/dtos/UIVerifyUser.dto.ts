import { StringField } from 'src/decorators';

export class UIVerifyUserDto {
  @StringField()
  readonly token: string;
}
