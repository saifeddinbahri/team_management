import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeamArgs } from 'src/args/create-team.args';
import { UpdateTeamArgs } from 'src/args/update-team.args';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { TeamModel } from 'src/models/team.model';
import { TeamRepositoryService } from 'src/repositories/team.repository/team.repository.service';
import { FastifyRequest } from 'fastify';
import { Role } from 'src/decorators/role/role.decorator';
import { RoleGuard } from 'src/guards/role/role.guard';

@Resolver()
export class TeamResolver {
  constructor(private teamRepositoryService: TeamRepositoryService) {}

  @Mutation(() => TeamModel)
  async createTeam(@Args() createTeamArgs: CreateTeamArgs): Promise<TeamModel> {
    console.log('its being called');
    return await this.teamRepositoryService.createTeam(createTeamArgs);
  }

  @Role('admin', 'user')
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => TeamModel)
  async getTeam(
    @Context('req') request: FastifyRequest,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TeamModel> {
    return await this.teamRepositoryService.findOneTeam(id);
  }

  @Mutation(() => TeamModel)
  async updateTeam(@Args() updateTeamArgs: UpdateTeamArgs): Promise<TeamModel> {
    return await this.teamRepositoryService.updateTeam(updateTeamArgs);
  }

  @Mutation(() => String)
  async deleteTeam(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    return await this.teamRepositoryService.deleteTeam(id);
  }

  @Role('admin', 'user')
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => [TeamModel])
  async getAllTeams(): Promise<TeamModel[]> {
    return await this.teamRepositoryService.getAllTeams();
  }
}
