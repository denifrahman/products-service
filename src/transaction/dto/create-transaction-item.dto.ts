import { Column } from "sequelize-typescript";

export class CreateTransactionDto {
  subTotal: number;
  discount: number;
  grandTotal: number;
  customerId: number;
  status: number;
}
