import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from 'src/user/user.model';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    if(await this.userService.validateUser(user)) {
      return this.authService.generateToken(user);
    }
  }
}
