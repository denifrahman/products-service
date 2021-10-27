import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ResponseJson } from "../utils/response";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @MessagePattern("CREATE_PRODUCT")
  async create(@Payload() createProductDto: CreateProductDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.productService.create(createProductDto);
      let response = new ResponseJson();``
      response.statusCode = HttpStatus.CREATED;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @MessagePattern("FIND_ALL_PRODUCT")
  async findAll(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      let response = new ResponseJson();
      response.data = await this.productService.findAll(data);
      response.statusCode = HttpStatus.OK;
      response.message = "OK";
      channel.ack(originalMsg);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
