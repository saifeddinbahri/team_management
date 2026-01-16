import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateTeamArgs {
  @Field()
  name: string;

  @Field()
  description: string;
}
