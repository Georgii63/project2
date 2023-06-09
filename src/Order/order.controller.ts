import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersServise } from './order.service';
import { Order } from './order.entity';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/OrderDTO';
import { AuthGuard } from '@nestjs/passport';
@Controller('orders')
@ApiTags('Заказ')
@ApiSecurity('JWT-auth')
export class OrdersController {
  constructor(private readonly ordersServise: OrdersServise) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.ordersServise.findAll();
  }
  @ApiOperation({ summary: 'Поиск заказа' })
  @Get(':order_id')
  findOne(@Param('order_id') order_id: number) {
    return this.ordersServise.findOne(+order_id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrder: Order) {
    return this.ordersServise.update(+id, updateOrder);
  }
  @Post()
  create(@Body() createOrder: CreateOrderDto) {
    return this.ordersServise.create(createOrder);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersServise.remove(+id);
  }
}
