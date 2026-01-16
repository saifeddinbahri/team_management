import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserRole } from 'src/entities/user.entity';
import { AuthModel } from 'src/models/auth.model';
import { AuthService } from 'src/services/auth/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthModel)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { type: () => UserRole }) role: UserRole,
  ): Promise<AuthModel> {
    const authData = await this.authService.register({ email, password, role });
    return authData;
  }

  @Mutation(() => AuthModel)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthModel> {
    const authData = await this.authService.login({ email, password });
    return authData;
  }
}
