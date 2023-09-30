import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './proto/product.pb';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          name: PRODUCT_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:' + configService.get<string>('PORT_PRODUCT'),
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
