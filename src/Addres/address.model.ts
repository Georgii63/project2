import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressServise } from './address.service';
import { DatasourceModule } from 'src/Datasource/datasource.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/Order/order.entity';
import { Address } from './address.entity';
@Module({
  controllers: [AddressController],
  providers: [AddressServise],
  imports: [DatasourceModule, TypeOrmModule.forFeature([Address, Order])],
})
export class AddressModel {}
