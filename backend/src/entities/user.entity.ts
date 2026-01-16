import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface JwtPayLoad {
  id: string;
  email: string;
  role: UserRole;
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role can be user or admin',
});

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  password: string;

  @ManyToOne(() => Team, (team) => team.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  team: Team;
}
