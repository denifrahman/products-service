import { Column } from "sequelize-typescript";

export class CreateTransactionItemDto {
  productId: number;
  transactionId: number;
  price: number;
}
