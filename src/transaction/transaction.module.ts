import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Transaction } from "./entities/transaction.entity";
import { TransactionItems } from "./entities/transaction-item.entity";

@Module({
  imports: [SequelizeModule.forFeature([Transaction, TransactionItems])],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {
}
