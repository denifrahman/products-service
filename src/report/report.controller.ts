import { BadRequestException, Controller, HttpStatus } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { ResponseJson } from "../utils/response";

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {
  }

  @MessagePattern("margin")
  margin(@Payload() type: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      response.data = this.reportService.margin(type);
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("transaction")
  async transaction(@Payload() type: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      response.data = await this.reportService.transaction(type);
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("customer")
  async customer(@Payload() type: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      response.data = await this.reportService.customer(type);
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
