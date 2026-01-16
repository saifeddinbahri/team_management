import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

@Injectable()
export class BcryptService {
  private salt = process.env.BCRYPT_SALT;
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password + this.salt, 10);
    return hash;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password + this.salt, hashedPassword);
  }
}
