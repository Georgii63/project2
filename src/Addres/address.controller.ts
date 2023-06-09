import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressServise } from './address.service';
import { Address } from './address.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from './dto/AddresDTO';
import { Roles } from 'src/Guard/role.decorator';
import { Role } from 'src/Guard/role.enum';
@Controller('address')
@ApiTags('Адрес')
export class AddressController {
  constructor(private readonly addressServise: AddressServise) {}
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.addressServise.findAll();
  }
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: number) {
    return this.addressServise.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAddres: Address) {
    return this.addressServise.update(+id, updateAddres);
  }
  @Post()
  create(@Body() createClinic: CreateAddressDto) {
    return this.addressServise.create(createClinic);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressServise.remove(+id);
  }
}
