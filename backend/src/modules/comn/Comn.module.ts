import { Module } from '@nestjs/common';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class CommonModule {}
