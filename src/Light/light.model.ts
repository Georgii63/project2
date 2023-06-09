import { Module } from '@nestjs/common';
import { LightsServise } from './light.service';
import { LightsController } from './light.controller';
import { DatasourceModule } from 'src/Datasource/datasource.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/Order/order.entity';
import { Light } from './light.entity';
@Module({
  controllers: [LightsController],
  providers: [LightsServise],
  imports: [DatasourceModule, TypeOrmModule.forFeature([Order, Light])],
})
export class LightModel {}
