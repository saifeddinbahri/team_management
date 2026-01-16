import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/entities/user.entity';
import { TeamModel } from './team.model';

@ObjectType({ description: 'user type' })
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => TeamModel, { nullable: true })
  team: TeamModel;
}
