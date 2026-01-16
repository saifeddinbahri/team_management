import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TeamResolver } from 'src/resolvers/team/team.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [TeamResolver],
})
export class TeamModule {}
