import { Column, Model, Sequelize, Table } from "sequelize-typescript";

@Table({ tableName: "product", createdAt: false, updatedAt: false })
export class Product extends Model {
  @Column
  sku: string;
  @Column
  name: string;
  @Column
  image: string;
  @Column
  description: string;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column
  createdBy: string;
}
