import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataNotFoundException } from 'src/exceptions/data-not-found.exception';
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception';
import { Repository } from 'typeorm';
import { TeamRepositoryService } from '../team.repository/team.repository.service';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { UpdateUserAsAdminArgs } from 'src/args/udpate-user-admin.args';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private teamRepositoryService: TeamRepositoryService,
    private brcyrtService: BcryptService,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: { id },
      relations: { team: true },
    });
    return user;
  }

  async createUser(newUser: User): Promise<User> {
    if (await this.findUserByEmail(newUser.email)) {
      throw new EmailAlreadyExistsException();
    }
    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async joinTeam(userId: string, teamId: string): Promise<User> {
    const user = await this.findUserById(userId);
    const team = await this.teamRepositoryService.findOneTeam(teamId);
    if (user && team) {
      user.team = team;
      const updatedUser = this.userRepository.save(user);
      return updatedUser;
    }
    throw new DataNotFoundException('user');
  }

  async leaveTeam(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (user) {
      user.team = null;
      return await this.userRepository.save(user);
    }
    throw new DataNotFoundException('user');
  }

  async updateUser(
    updatedUser: UpdateUserAsAdminArgs,
    userId?: string,
  ): Promise<User> {
    let user: User;

    if (updatedUser.id) {
      user = await this.findUserById(updatedUser.id);
    } else {
      user = await this.findUserById(userId);
    }
    if (user) {
      user.email = updatedUser.email;
      user.role = updatedUser.role ?? user.role;
      if (updatedUser.password) {
        user.password = await this.brcyrtService.hashPassword(
          updatedUser.password,
        );
      }
      return await this.userRepository.save(user);
    }

    throw new DataNotFoundException('user');
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new DataNotFoundException('user');
    }
    await this.userRepository.delete(user);
  }
}
