import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { UserResolver } from 'src/resolvers/user/user.resolver';

@Module({
  imports: [AuthModule, RepositoryModule],
  providers: [UserResolver],
})
export class UserModule {}
