import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const jwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '30d' },
};
