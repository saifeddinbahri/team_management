import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  projectName(@Args('name') name: string): string {
    return `Team management system ${name}`;
  }
}
