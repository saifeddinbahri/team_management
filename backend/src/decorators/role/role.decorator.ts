import { SetMetadata } from '@nestjs/common';

export const ROLE_KEYS = 'role';
export const Role = (...args: string[]) => SetMetadata(ROLE_KEYS, args);
