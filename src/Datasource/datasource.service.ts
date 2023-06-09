import { Injectable } from '@nestjs/common';
import { Order } from 'src/Order/order.entity';
import { Light } from 'src/Light/light.entity';
import { Address } from 'src/Addres/address.entity';

@Injectable()
export class DatasourceService {
  private order: Order[] = [];
  private light: Light[] = [];
  private address: Address[] = [];

  getOrder(): Order[] {
    return this.order;
  }
  getLight(): Light[] {
    return this.light;
  }
  getAddress(): Address[] {
    return this.address;
  }
}
