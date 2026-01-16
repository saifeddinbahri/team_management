import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { ROLE_KEYS } from 'src/decorators/role/role.decorator';
import { JwtPayLoad } from 'src/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const request = context.getArgs()[2].req as FastifyRequest;
    const roles = this.reflector.getAllAndOverride<string[]>(ROLE_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = request['user'] as JwtPayLoad;
    if (user && roles) {
      if (roles.includes(user.role)) {
        return true;
      }
    }
    return false;
  }
}
