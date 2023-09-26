import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
