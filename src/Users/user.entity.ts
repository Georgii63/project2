import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'vv',
    description: 'имя пользователя',
  })
  @Column()
  username: string;
  @ApiProperty({ example: 'vv', description: 'пароль' })
  @Column()
  password: string;
}
