import { Address } from 'src/Addres/address.entity';
import { Light } from 'src/Light/light.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  discount: number;
  @ManyToMany(() => Light, (light) => light.orderid)
  @JoinTable({
    name: 'lightInOrder',
    joinColumn: { name: 'Order_id' },
    inverseJoinColumn: { name: 'Light_id' },
  })
  lightid: Light[];
  @ManyToOne(() => Address, (address) => address.orderid)
  @JoinColumn({ name: 'address_id'})
  addressid: Address;
}
