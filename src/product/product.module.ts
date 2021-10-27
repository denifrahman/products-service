import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./entities/product.entity";
import { ProductStock } from "./entities/product-stock.entity";
import { ProductStockLog } from "./entities/product-stock-log.entity";

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductStock, ProductStockLog])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {
}
