import { Column } from "sequelize-typescript";
import { CreateTransactionItemDto } from "./create-transaction-item.dto";

export class CreateTransactionDto {
  subTotal: number;
  discount: number;
  grandTotal: number;
  customerId: number;
  status: number;
  items:CreateTransactionItemDto[]
}
