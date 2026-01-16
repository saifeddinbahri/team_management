import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { UpdateUserAsAdminArgs } from 'src/args/udpate-user-admin.args';
import { UpdateUserArgs } from 'src/args/update-user.args';
import { Role } from 'src/decorators/role/role.decorator';
import { JwtPayLoad } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { UserModel } from 'src/models/user.model';
import { UserRepositoryService } from 'src/repositories/user.repository/user.repository.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userRepositoryService: UserRepositoryService) {}

  @Role('admin', 'user')
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => UserModel)
  async getCurrentUser(
    @Context('req') req: FastifyRequest,
  ): Promise<UserModel> {
    const { id } = req['user'] as JwtPayLoad;

    const userData = await this.userRepositoryService.findUserById(id);
    return userData;
  }

  @Role('user', 'admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async joinTeam(
    @Args('teamId') teamId: string,
    @Context('req') req: FastifyRequest,
  ): Promise<UserModel> {
    const { id } = req['user'] as JwtPayLoad;
    return await this.userRepositoryService.joinTeam(id, teamId);
  }

  @Role('user', 'admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async leaveTeam(@Context('req') req: FastifyRequest): Promise<UserModel> {
    const { id } = req['user'] as JwtPayLoad;
    return await this.userRepositoryService.leaveTeam(id);
  }

  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async addUserToTeam(
    @Args('teamId') teamId: string,
    @Args('userId') userId: string,
  ): Promise<UserModel> {
    return await this.userRepositoryService.joinTeam(userId, teamId);
  }

  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async kickUserFromTeam(@Args('userId') userId: string): Promise<UserModel> {
    return await this.userRepositoryService.leaveTeam(userId);
  }

  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async updateUserAsAdmin(
    @Args() updateUserArgs: UpdateUserAsAdminArgs,
  ): Promise<UserModel> {
    return await this.userRepositoryService.updateUser(updateUserArgs);
  }

  @Role('admin', 'user')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => UserModel)
  async updateUser(
    @Args() updateUserArgs: UpdateUserArgs,
    @Context('req') req: FastifyRequest,
  ): Promise<UserModel> {
    const { id } = req['user'] as JwtPayLoad;
    console.log(req['user']);
    return await this.userRepositoryService.updateUser(
      updateUserArgs as UpdateUserAsAdminArgs,
      id,
    );
  }

  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userRepositoryService.getAllUsers();
  }

  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Mutation(() => String)
  async deleteUser(@Args('userId') userId: string): Promise<string> {
    await this.userRepositoryService.deleteUser(userId);
    return 'User deleted successfully';
  }
}
