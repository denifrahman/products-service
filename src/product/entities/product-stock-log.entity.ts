import { BelongsTo, Column, ForeignKey, Model, Sequelize, Table } from "sequelize-typescript";
import { ProductStock } from "./product-stock.entity";

@Table({ tableName: "product_stock_log", createdAt: false, updatedAt: false })
export class ProductStockLog extends Model {
  @Column({ field: "product_stock_id" })
  @ForeignKey(() => ProductStock)
  productStockId: number;
  @BelongsTo(() => ProductStock)
  productStock: ProductStock;
  @Column
  status: string;
  @Column
  qty: string;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column
  createdBy: string;
}
