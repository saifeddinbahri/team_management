import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwt.conf';
import { RepositoryModule } from '../repository/repository.module';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthResolver } from 'src/resolvers/auth/auth.resolver';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { CommonModule } from '../comn/Comn.module';

@Module({
  imports: [
    JwtModule.register(jwtModuleOptions),
    RepositoryModule,
    CommonModule,
  ],
  providers: [AuthService, AuthResolver, AuthGuard, RoleGuard],
  controllers: [AuthController],
  exports: [AuthGuard, RoleGuard],
})
export class AuthModule {}
