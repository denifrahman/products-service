import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductModule } from "./product/product.module";
import { ProductPurchaseModule } from "./product-purchase/product-purchase.module";
import { CustomerModule } from './customer/customer.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "root",
      database: "pre-test",
      sync: {
        alter: true
      },
      autoLoadModels: true
    }),
    ProductModule,
    ProductPurchaseModule,
    CustomerModule,
    TransactionModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
