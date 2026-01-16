import { HttpException, HttpStatus } from '@nestjs/common';

export class DataNotFoundException extends HttpException {
  constructor(dataName: string) {
    super(`${dataName} not found`, HttpStatus.NOT_FOUND);
  }
}
