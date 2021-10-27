import { BadRequestException, Controller, HttpStatus } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { ResponseJson } from "../utils/response";

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {
  }

  @MessagePattern("createTransaction")
  async create(@Payload() createTransactionDto: CreateTransactionDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.transactionService.create(createTransactionDto);
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("findAllTransaction")
  async findAll(@Payload() createTransactionDto: CreateTransactionDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.data = await this.transactionService.findAll();
      response.statusCode = HttpStatus.OK;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("findOneTransaction")
  findOne(@Payload() id: number) {
    return this.transactionService.findOne(id);
  }

  @MessagePattern("updateTransaction")
  update(@Payload() updateTransactionDto: UpdateTransactionDto, @Ctx() context: RmqContext) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      let response = new ResponseJson();
      this.transactionService.update(updateTransactionDto.id, updateTransactionDto);
      response.message = "OK";
      response.statusCode = HttpStatus.OK;
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("updateTransactionStatus")
  updateStatus(@Payload() updateTransactionDto: UpdateTransactionDto, @Ctx() context: RmqContext) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      let response = new ResponseJson();
      this.transactionService.updateStatus(updateTransactionDto);
      response.message = "OK";
      response.statusCode = HttpStatus.OK;
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("removeTransaction")
  async remove(@Payload() id: number, @Ctx() context: RmqContext) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      await this.transactionService.remove(id);
      let response = new ResponseJson();
      response.message = "deleted";
      response.statusCode = HttpStatus.OK;
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
    ;
  }
}
