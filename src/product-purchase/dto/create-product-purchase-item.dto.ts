import { BelongsTo, Column, DataType, ForeignKey, Sequelize } from "sequelize-typescript";
import { ProductPurchaseItem } from "../entities/product-purchase-item.entity";
import { ProductPurchase } from "../entities/product-purchase.entity";
import { Product } from "../../product/entities/product.entity";

export class CreateProductPurchaseItemDto {
  productPurchaseId: number;
  produkId: number;
  qty: number;
  purchasePrice: number;
}
