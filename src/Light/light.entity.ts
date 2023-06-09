import { Order } from 'src/Order/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('lights')
export class Light {
  @PrimaryGeneratedColumn()
  light_id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  company: string;
  @Column()
  matireals: string;
  @Column()
  info: string;
  @ManyToMany(() => Order, (order) => order.lightid)
  @JoinTable({
    name: 'lightInOrder',
    joinColumn: { name: 'Light_id' },
    inverseJoinColumn: { name: 'Order_id' },
  })
  orderid: Order[];
}
