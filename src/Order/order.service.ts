import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { In, Repository } from 'typeorm';
import { Address } from 'src/Addres/address.entity';
import { Light } from 'src/Light/light.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/OrderDTO';
import { IncompleteOrderDto } from './dto/incomplete_order';

@Injectable()
export class OrdersServise {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Light)
    private readonly lightRepository: Repository<Light>,
  ) {}
  //CRUD.
  // добавление заказа в бд.
  async create(OrderDTO: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create();
    order.name = OrderDTO.name;
    order.discount = OrderDTO.discount;
    order.price = OrderDTO.discount;
    const addressid = await this.addressRepository.findBy({
      id: In(OrderDTO.addressid),
    });
    order.addressid = addressid[0];
    const lightid = await this.lightRepository.findBy({
      light_id: In(OrderDTO.lightid),
    });
    order.lightid = lightid;
    await this.orderRepository.save(order);
    return order;
  }
  //поиск заказа по айди.
  findOne(order_id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { order_id },
      relations: {
        addressid: true,
        lightid: true,
      },
    });
  }
  //возвращает все заказы.
  async findAll(): Promise<Order[]> {
    const order = await this.orderRepository.find({
      relations: {
        addressid: true,
        lightid: true,
      },
    });
    return order;
  }
  async findIncomplete(): Promise<IncompleteOrderDto[]> {
    const order = await this.orderRepository.find();
    const incompliteorder: IncompleteOrderDto[] = order.map((order) => {
      const incomplite = new IncompleteOrderDto();
      incomplite.order_id = order.order_id[0];
      incomplite.name = order.name;
      incomplite.price = order.price;
      return incomplite;
    });
    return incompliteorder;
  }
  //изменение заказа.
  async update(order_id: number, updateOrder: Order) {
    const order = await this.orderRepository.findOne({ where: { order_id } });
    order.name = updateOrder.name;
    order.discount = updateOrder.discount;
    order.price = updateOrder.discount;
    order.addressid = updateOrder.addressid;
    order.lightid = updateOrder.lightid;
    await this.orderRepository.save(order);
    return order;
  }
  //Удаление заказа
  async remove(order_id: number) {
    await this.orderRepository.delete({ order_id });
  }
}
