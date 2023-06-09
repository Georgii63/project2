import { Injectable } from '@nestjs/common';
import { Light } from './light.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/Order/order.entity';
import { In, Repository } from 'typeorm';
import { CreateLightDto } from './dto/LightDTO';

@Injectable()
export class LightsServise {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Light)
    private readonly lightRepository: Repository<Light>,
  ) {}
  //CRUD.
  // добавление товара в бд.
  async create(lightDTO: CreateLightDto): Promise<Light> {
    const light = await this.lightRepository.create();
    light.name = lightDTO.name;
    light.company = lightDTO.company;
    light.price = lightDTO.price;
    light.matireals = lightDTO.matireals;
    light.info = lightDTO.info;
    const orderid = await this.orderRepository.findBy({
      order_id: In(lightDTO.orderid),
    });
    light.orderid = orderid;
    await this.lightRepository.save(light);
    return light;
  }
  //поиск товар по компании.
  async findOne(company: string): Promise<Light> {
    return this.lightRepository.findOne({
      where: { company },
      relations: {
        orderid: true,
      },
    });
  }
  //возвращает все товары.
  async findAll(): Promise<Light[]> {
    const light = await this.lightRepository.find({
      relations: {
        orderid: true,
      },
    });
    return light;
  }
  //изменение товара.
  async update(light_id: number, updateLight: Light) {
    const light = await this.lightRepository.findOne({
      where: { light_id },
    });
    light.name = updateLight.name;
    light.company = updateLight.company;
    light.price = updateLight.price;
    light.matireals = updateLight.matireals;
    light.info = updateLight.info;
    light.orderid = updateLight.orderid;
    await this.lightRepository.save(light);
    return light;
  }
  //Удаление товара
  async remove(light_id: number) {
    await this.lightRepository.delete({ light_id });
  }
}
