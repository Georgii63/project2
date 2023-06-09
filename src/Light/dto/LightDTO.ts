import { ApiProperty } from '@nestjs/swagger';
export class CreateLightDto {
  @ApiProperty({
    example: 'Moon light 228',
    description: 'Назавание светового оборудования',
  })
  name: string;
  @ApiProperty({ example: '112', description: 'цена заказа' })
  price: number;
  @ApiProperty({
    example: 'ОАО собез',
    description: 'названии компании производящая данный продукт',
  })
  company: string;
  @ApiProperty({
    example: 'пластик',
    description: 'материалы из который состоит продукт',
  })
  matireals: string;
  @ApiProperty({
    example: 'даже солнце не так светит',
    description: 'Полное описание товара',
  })
  info: string;
  @ApiProperty({ example: '[1]', description: 'айди заказа' })
  orderid: number[];
}
