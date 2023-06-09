import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Users/user.entity';
import { UsersService } from '../Users/user.service';
import { JwtPayload } from './local-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(payload: JwtPayload): Promise<User> {
    return this.usersService.findOne(payload.username);
  }
  async login(userDto: User) {
    const payload: JwtPayload = { username: userDto.username };
    const user = await this.usersService.login(userDto);
    if (!user) {
      return null;
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
