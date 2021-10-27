import { Column, Model, Sequelize, Table } from "sequelize-typescript";

@Table({ tableName: "product", createdAt: false, updatedAt: false })
export class Product extends Model {
  @Column
  sku: number;
  @Column
  name: string;
  @Column
  image: string;
  @Column
  description: string;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  @Column
  createdBy: string;
}
