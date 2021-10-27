import { BadRequestException, Controller, HttpStatus } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ProductPurchaseService } from "./product-purchase.service";
import { CreateProductPurchaseDto } from "./dto/create-product-purchase.dto";
import { UpdateProductPurchaseDto } from "./dto/update-product-purchase.dto";
import { ResponseJson } from "../utils/response";
import { CreateProductDto } from "../product/dto/create-product.dto";

@Controller()
export class ProductPurchaseController {
  constructor(private readonly productPurchaseService: ProductPurchaseService) {
  }

  @MessagePattern("createProductPurchase")
 async create(@Payload() createProductPurchaseDto: CreateProductPurchaseDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.productPurchaseService.create(createProductPurchaseDto);
      let response = new ResponseJson();
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("findAllProductPurchase")
  async findAll(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.statusCode = HttpStatus.OK;
      response.data = await this.productPurchaseService.findAll();
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

}
