import { ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
  @ApiProperty({ example: 'Москва', description: 'адресс заказа' })
  city: string;
  @ApiProperty({ example: 'ул. Кутузовская', description: 'название улиц' })
  street: string;
  @ApiProperty({ example: '[1]', description: 'ади заказа' })
  orderid: number[];
}
