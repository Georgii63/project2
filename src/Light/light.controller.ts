import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LightsServise } from './light.service';
import { Light } from './light.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateLightDto } from './dto/LightDTO';
import { Roles } from 'src/Guard/role.decorator';
import { Role } from 'src/Guard/role.enum';
@Controller('lights')
@ApiTags('Световое оборудование')
export class LightsController {
  constructor(private readonly lightsServise: LightsServise) {}
  @Get()
  findAll() {
    return this.lightsServise.findAll();
  }
  @Get(':company')
  findOne(@Param('company') company: string) {
    return this.lightsServise.findOne(company);
  }
  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateLight: Light) {
    return this.lightsServise.update(+id, updateLight);
  }
  @Post()
  @Roles(Role.Admin)
  create(@Body() createLight: CreateLightDto) {
    return this.lightsServise.create(createLight);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.lightsServise.remove(+id);
  }
}
