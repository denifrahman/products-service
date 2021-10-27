import { Column, DataType, Model, Sequelize, Table } from "sequelize-typescript";

@Table({ tableName: "product_purchase", createdAt: false, updatedAt: false })
export class ProductPurchase extends Model {
  @Column
  code: string;
  @Column({type:DataType.FLOAT, field:'sub_total'})
  subTotal: number;
  @Column({type:DataType.FLOAT, field:'grand_total'})
  grandTotal: number;
  @Column({defaultValue:Sequelize.literal('NOW()')})
  createdAt: Date;
  @Column({defaultValue:Sequelize.literal('NOW()')})
  updatedAt: Date;
  @Column
  createdBy: string;
}
