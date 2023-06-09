import { Injectable } from '@nestjs/common';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/Order/order.entity';
import { In, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/AddresDTO';

@Injectable()
export class AddressServise {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  //CRUD.
  // добавление адреса.
  async create(addressDTO: CreateAddressDto): Promise<Address> {
    const address = await this.addressRepository.create();
    address.city = addressDTO.city;
    address.street = addressDTO.street;
    const orderid = await this.orderRepository.findBy({
      order_id: In(addressDTO.orderid),
    });
    address.orderid = orderid;
    return address;
  }
  //поиск адресса по айди.
  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne({
      where: { id },
      relations: {
        orderid: true,
      },
    });
  }
  //возвращает адрессов.
  async findAll(): Promise<Address[]> {
    const address = await this.addressRepository.find({
      relations: {
        orderid: true,
      },
    });
    return address;
  }
  //изменение информации адреса.
  async update(id: number, updateAddress: Address) {
    const address = await this.addressRepository.findOne({ where: { id } });
    address.city = updateAddress.city;
    address.street = updateAddress.street;
    address.orderid = updateAddress.orderid;
    return address;
  }
  //Удаление адресов
  async remove(id: number) {
    await this.addressRepository.delete({ id });
  }
}
