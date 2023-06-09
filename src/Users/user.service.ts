import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(userDto: User): Promise<any | { status: number }> {
    const user = await this.findOne(userDto.username);
    if (!user) {
      return Promise.resolve(null);
    }
    if (user.password !== userDto.password) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
  async findOne(username: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { username } });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
