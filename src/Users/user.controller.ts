import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../Users/user.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
