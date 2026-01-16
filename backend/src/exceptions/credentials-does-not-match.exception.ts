import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialsDoesNotMatchException extends HttpException {
  constructor() {
    super('Credentials does not match', HttpStatus.CONFLICT);
  }
}
