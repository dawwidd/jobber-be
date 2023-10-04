import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findUserByEmail(email);
    
            if (!(user && (await bcrypt.compare(password, user.password)))) {
                throw new BadRequestException("Invalid username or password");
            }
            user.password = undefined;
            return user;
        }
        catch(err) {
            throw new BadRequestException("Invalid username or password")
        }
    }

    async generateToken(user: User) {
        const payload = { email: user.email };

        return {
            access_token: jwt.sign(payload, 'secretKey', { expiresIn: '24h' }),
        };
    }

    getCookieWithJwtToken(userId: ObjectId) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRES_IN')}`
    }
}

export interface TokenPayload {
    userId: ObjectId;
}
