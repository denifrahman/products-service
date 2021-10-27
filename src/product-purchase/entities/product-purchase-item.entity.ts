import { BelongsTo, Column, DataType, ForeignKey, Model, Sequelize, Table } from "sequelize-typescript";
import { Product } from "../../product/entities/product.entity";
import { ProductPurchase } from "./product-purchase.entity";

@Table({ tableName: "product_purchase_item", createdAt: false, updatedAt: false })
export class ProductPurchaseItem extends Model {
  @Column({ field: "product_purchase_id" })
  @ForeignKey(() => ProductPurchase)
  productPurchaseId: number;
  @BelongsTo(() => ProductPurchase)
  produkPurchase: ProductPurchase;
  @Column({ field: "product_id" })
  @ForeignKey(() => Product)
  produkId: number;
  @BelongsTo(()=>Product)
  product:Product
  @Column
  qty: number;
  @Column({ field: "purchase_price", type: DataType.FLOAT })
  purchasePrice: number;
}
