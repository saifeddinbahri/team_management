import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserArgs {
  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;
}
