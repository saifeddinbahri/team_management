import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotFoundException extends HttpException {
  constructor() {
    super('Email does not exist', HttpStatus.NOT_FOUND);
  }
}
