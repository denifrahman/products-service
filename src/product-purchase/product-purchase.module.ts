import { Module } from '@nestjs/common';
import { ProductPurchaseService } from './product-purchase.service';
import { ProductPurchaseController } from './product-purchase.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductPurchase } from "./entities/product-purchase.entity";
import { ProductPurchaseItem } from "./entities/product-purchase-item.entity";

@Module({
  imports:[SequelizeModule.forFeature([ProductPurchase,ProductPurchaseItem])],
  controllers: [ProductPurchaseController],
  providers: [ProductPurchaseService]
})
export class ProductPurchaseModule {}
