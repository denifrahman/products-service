import { Column, Model, Sequelize, Table } from "sequelize-typescript";

@Table({ tableName: "transaction", createdAt: false, updatedAt: false })
export class Transaction extends Model {
  @Column({field:'sub_total'})
  subTotal: number;
  @Column({field:'discount'})
  discount: number;
  @Column({field:'grand_total'})
  grandTotal: number;
  @Column({field:'costumer_id'})
  customerId: number;
  @Column
  status: number;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  createdAt: Date;
  @Column({ defaultValue: Sequelize.literal("NOW()") })
  updatedAt: Date;
}
