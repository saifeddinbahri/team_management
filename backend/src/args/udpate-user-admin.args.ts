import { ArgsType, Field, ID } from '@nestjs/graphql';
import { UpdateUserArgs } from './update-user.args';
import { UserRole } from 'src/entities/user.entity';

@ArgsType()
export class UpdateUserAsAdminArgs extends UpdateUserArgs {
  @Field(() => ID)
  id: string;

  @Field(() => UserRole)
  role: UserRole;
}
