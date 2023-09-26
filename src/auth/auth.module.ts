import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{name: 'user', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, UserService],
})
export class AuthModule {}
