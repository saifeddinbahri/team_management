import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamArgs } from 'src/args/create-team.args';
import { UpdateTeamArgs } from 'src/args/update-team.args';
import { Team } from 'src/entities/team.entity';
import { DataNotFoundException } from 'src/exceptions/data-not-found.exception';
import { TeamModel } from 'src/models/team.model';
import { Repository } from 'typeorm';

@Injectable()
export class TeamRepositoryService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async createTeam(teamArgs: CreateTeamArgs): Promise<Team> {
    const team = this.teamRepository.create({ ...teamArgs } as Team);
    return await this.teamRepository.save(team);
  }

  async deleteTeam(id: string): Promise<string> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (team) {
      await this.teamRepository.delete(team);
      return 'User deleted successfully';
    }
    throw new DataNotFoundException('Team');
  }

  async findOneTeam(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new DataNotFoundException('Team');
    }

    return team;
  }

  async updateTeam(updateTeamArgs: UpdateTeamArgs): Promise<TeamModel> {
    const team = await this.teamRepository.findOne({
      where: { id: updateTeamArgs.id },
    });
    if (team) {
      team.description = updateTeamArgs.description;
      team.name = updateTeamArgs.name;

      return await this.teamRepository.save(team);
    }
    throw new DataNotFoundException('Team');
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.find({ relations: { users: true } });
  }
}
