import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterDTO } from 'src/dto/register.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const token = await this.authService.register(registerDTO);
    return { token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return { token };
  }
}
