import { Module } from '@nestjs/common';
import { OrdersServise } from './order.service';
import { OrdersController } from './order.controller';
import { DatasourceModule } from 'src/Datasource/datasource.model';
import { Address } from 'src/Addres/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Light } from 'src/Light/light.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersServise],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Address, Order, Light]),
  ],
})
export class OrderModel {}
