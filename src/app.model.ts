import { Module } from '@nestjs/common';
import { OrderModel } from './Order/order.model';
import { DatasourceModule } from './Datasource/datasource.model';
import { LightModel } from './Light/light.model';
import { AddressModel } from './Addres/address.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Users/user.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    OrderModel,
    AddressModel,
    LightModel,
    UserModule,
    AuthModule,
    DatasourceModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      username: 'postgres', //имя пользователя
      password: 'education', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: false, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: 'all', //включим логирование для удобства отслеживания процессов
      entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
