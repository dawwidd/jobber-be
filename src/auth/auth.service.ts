import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);

        if (user && (await compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async generateToken(user: User) {
        const payload = { email: user.email };

        return {
            access_token: jwt.sign(payload, 'secretKey', { expiresIn: '24h' }),
        };
    }
}
