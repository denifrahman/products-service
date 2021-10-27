import { Column, DataType, Sequelize } from "sequelize-typescript";
import { CreateProductPurchaseItemDto } from "./create-product-purchase-item.dto";

export class CreateProductPurchaseDto {
  code: string;
  subTotal: number;
  grandTotal: number;
  createdBy: string;
  productPurchaseItems: CreateProductPurchaseItemDto[];
}
