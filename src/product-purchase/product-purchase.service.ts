import { Injectable } from '@nestjs/common';
import { CreateProductPurchaseDto } from './dto/create-product-purchase.dto';
import { UpdateProductPurchaseDto } from './dto/update-product-purchase.dto';

@Injectable()
export class ProductPurchaseService {
  create(createProductPurchaseDto: CreateProductPurchaseDto) {
    return 'This action adds a new productPurchase';
  }

  findAll() {
    return `This action returns all productPurchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPurchase`;
  }

  update(id: number, updateProductPurchaseDto: UpdateProductPurchaseDto) {
    return `This action updates a #${id} productPurchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPurchase`;
  }
}
