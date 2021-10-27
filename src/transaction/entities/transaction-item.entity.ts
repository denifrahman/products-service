import { BelongsTo, Column, ForeignKey, Model, Sequelize, Table } from "sequelize-typescript";
import { Transaction } from "./transaction.entity";
import { Product } from "../../product/entities/product.entity";

@Table({ tableName: "transaction_items", createdAt: false, updatedAt: false })
export class TransactionItems extends Model {
  @Column({ field: "transaction_id" })
  @ForeignKey(() => Transaction)
  transactionId: number;
  @BelongsTo(() => Transaction, { onDelete: "cascade", onUpdate: "cascade" })
  transaction: Transaction;
  @Column({ field: "product_id" })
  @ForeignKey(()=>Product)
  productId: number;
  @BelongsTo(() => Product, { onDelete: "cascade", onUpdate: "cascade" })
  product: Product;
  @Column({ field: "price" })
  price: number;
  @Column
  status: number;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  updatedAt: Date;
}
