import { Column, DataType, Sequelize } from "sequelize-typescript";
import { ProductPurchaseItem } from "../entities/product-purchase-item.entity";

export class CreateProductPurchaseDto {

  code: string;

  subTotal: number;

  grandTotal: number;
  createdBy: string;
  productPurchaseItems: ProductPurchaseItem[];
}
