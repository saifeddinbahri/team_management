import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/entities/user.entity';

@ObjectType()
export class AuthModel {
  @Field()
  token: string;
  @Field()
  role: UserRole;
}
