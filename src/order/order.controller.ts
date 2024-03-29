import { Body, Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderRequestDto } from './order.dto';
import { OrderService } from './order.service';
import { CreateOrderResponse, ORDER_SERVICE_NAME } from './proto/order.pb';

@Controller('order')
export class OrderController {
  @Inject(OrderService)
  orderService: OrderService;

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  public async createOrder(
    @Body() body: CreateOrderRequestDto,
  ): Promise<CreateOrderResponse> {
    return this.orderService.createOrder(body);
  }
}
