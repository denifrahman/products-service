import { Module } from '@nestjs/common';
import { ProductPurchaseService } from './product-purchase.service';
import { ProductPurchaseController } from './product-purchase.controller';

@Module({
  controllers: [ProductPurchaseController],
  providers: [ProductPurchaseService]
})
export class ProductPurchaseModule {}
