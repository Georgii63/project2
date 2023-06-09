import { Controller, Get } from '@nestjs/common';
import { OrdersServise } from '../order.service';
@Controller('orders')
export class OrderController {
  constructor(private readonly orderdService: OrdersServise) {}
  @Get('incomplete')
  findIncomplete() {
    return this.orderdService.findIncomplete();
  }
}
