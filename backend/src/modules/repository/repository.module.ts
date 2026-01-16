import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';
import { TeamRepositoryService } from 'src/repositories/team.repository/team.repository.service';
import { UserRepositoryService } from 'src/repositories/user.repository/user.repository.service';
import { CommonModule } from '../comn/Comn.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User]), CommonModule],
  providers: [UserRepositoryService, TeamRepositoryService],
  exports: [UserRepositoryService, TeamRepositoryService],
})
export class RepositoryModule {}
