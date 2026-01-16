import { ArgsType, Field, ID } from '@nestjs/graphql';
import { CreateTeamArgs } from './create-team.args';

@ArgsType()
export class UpdateTeamArgs extends CreateTeamArgs {
  @Field(() => ID)
  id: string;
}
