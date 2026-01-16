import { Injectable } from '@nestjs/common';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { CredentialsDoesNotMatchException } from 'src/exceptions/credentials-does-not-match.exception';
import { EmailNotFoundException } from 'src/exceptions/email-not-found.exception';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from 'src/repositories/user.repository/user.repository.service';
import { RegisterDTO } from 'src/dto/register.dto';
import { User } from 'src/entities/user.entity';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthModel } from 'src/models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<AuthModel> {
    const password = await this.bcryptService.hashPassword(
      registerDTO.password,
    );
    const user = await this.userRepositoryService.createUser({
      ...registerDTO,
      password,
    } as User);
    const payload = { id: user.id, email: user.email, role: user.role };
    return { token: await this.jwtService.signAsync(payload), role: user.role };
  }

  async login(loginDTO: LoginDTO): Promise<AuthModel> {
    const user = await this.userRepositoryService.findUserByEmail(
      loginDTO.email,
    );
    if (user) {
      const passwordMatch = await this.bcryptService.comparePassword(
        loginDTO.password,
        user.password,
      );
      if (!passwordMatch) throw new CredentialsDoesNotMatchException();
    } else {
      throw new EmailNotFoundException();
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    return { token: await this.jwtService.signAsync(payload), role: user.role };
  }
}
