import { BelongsTo, Column, ForeignKey, Model, Sequelize, Table } from "sequelize-typescript";
import { Product } from "./product.entity";

@Table({ tableName: "product_stock", createdAt: false, updatedAt: false })
export class ProductStock extends Model {
  @Column
  qty: number;
  @Column({ field: "product_id" })
  @ForeignKey(() => Product)
  productId: number;
  @BelongsTo(() => Product)
  product: Product;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column
  createdBy: string;
}
