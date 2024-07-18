import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialsException extends UnauthorizedException {
  constructor(error?: string) {
    super('error.wrongCredentials', error);
  }
}
