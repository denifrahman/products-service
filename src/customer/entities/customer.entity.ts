import { Column, Model, Sequelize, Table } from "sequelize-typescript";

@Table({ tableName: "customer", createdAt: false, updatedAt:false })
export class Customer extends Model {
  @Column
  name: string;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  updatedAt: Date;
  @Column
  createdBy: string;
}
