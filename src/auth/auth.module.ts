import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../Users/user.model';
import { UsersService } from 'src/Users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/user.entity';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
