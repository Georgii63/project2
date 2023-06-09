import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({ example: 'N231421512KV', description: 'Заказ' })
  name: string;
  @ApiProperty({ example: '112', description: 'цена заказа' })
  price: number;
  @ApiProperty({ example: '20', description: 'скидка' })
  discount: number;
  @ApiProperty({ example: '[1]', description: 'айди светового оборудования' })
  lightid: number[];
  @ApiProperty({ example: '[1]', description: 'айди адреса назначения' })
  addressid: number[];
}
