import { Order } from 'src/Order/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  city: string;
  @Column()
  street: string;
  @OneToMany(() => Order, (order) => order.addressid)
  orderid: Order[];
}
