import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class TeamModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [UserModel], { nullable: 'items' })
  users: UserModel[];
}
