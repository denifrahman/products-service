import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductPurchaseService } from './product-purchase.service';
import { CreateProductPurchaseDto } from './dto/create-product-purchase.dto';
import { UpdateProductPurchaseDto } from './dto/update-product-purchase.dto';

@Controller()
export class ProductPurchaseController {
  constructor(private readonly productPurchaseService: ProductPurchaseService) {}

  @MessagePattern('createProductPurchase')
  create(@Payload() createProductPurchaseDto: CreateProductPurchaseDto) {
    return this.productPurchaseService.create(createProductPurchaseDto);
  }

  @MessagePattern('findAllProductPurchase')
  findAll() {
    return this.productPurchaseService.findAll();
  }

  @MessagePattern('findOneProductPurchase')
  findOne(@Payload() id: number) {
    return this.productPurchaseService.findOne(id);
  }

  @MessagePattern('updateProductPurchase')
  update(@Payload() updateProductPurchaseDto: UpdateProductPurchaseDto) {
    return this.productPurchaseService.update(updateProductPurchaseDto.id, updateProductPurchaseDto);
  }

  @MessagePattern('removeProductPurchase')
  remove(@Payload() id: number) {
    return this.productPurchaseService.remove(id);
  }
}
