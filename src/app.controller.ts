import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('CREATE_PRODUCT')
  create(@Payload() data: string, @Ctx() context: RmqContext): string {
    return this.appService.getHello();
  }


}
