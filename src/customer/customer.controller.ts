import { BadRequestException, Controller, HttpStatus } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseJson } from "../utils/response";

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern('createCustomer')
  async create(@Payload() createCustomerDto: CreateCustomerDto,@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.customerService.create(createCustomerDto);
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern('findAllCustomer')
  async findAll(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.statusCode = HttpStatus.OK;
      response.data = await this.customerService.findAll();
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
