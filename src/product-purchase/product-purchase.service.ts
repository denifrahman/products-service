import { Injectable } from "@nestjs/common";
import { CreateProductPurchaseDto } from "./dto/create-product-purchase.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";
import { ProductPurchase } from "./entities/product-purchase.entity";
import { ProductPurchaseItem } from "./entities/product-purchase-item.entity";


@Injectable()
export class ProductPurchaseService {
  constructor(
    private connection: Sequelize
  ) {
  }

  async create(createProductPurchaseDto: CreateProductPurchaseDto) {
    const t = await this.connection.transaction();
    let insertProdukPurchase = await this.connection.query(`insert into product_purchase (code,sub_total,grand_total, createdBy) VALUE ('${createProductPurchaseDto.code}',${createProductPurchaseDto.subTotal},${createProductPurchaseDto.grandTotal},'${createProductPurchaseDto.createdBy}') `, {
      raw: true,
      type: QueryTypes.INSERT,
      transaction: t
    });
    let insertProdukPurchaseItem;
    for (const e of createProductPurchaseDto.productPurchaseItems) {
      e.productPurchaseId = insertProdukPurchase[0];
      insertProdukPurchaseItem = await this.connection.query(`insert into product_purchase_item (product_purchase_id,product_id,purchase_price, qty) VALUE (${e.productPurchaseId},${e.produkId},${e.purchasePrice},${e.qty}) `, {
        raw: true,
        type: QueryTypes.INSERT,
        transaction: t
      });
      let insertStock = await this.connection.query(`insert into product_stock (qty, product_id) values (${e.qty},${e.produkId})`, {
        raw: true,
        type: QueryTypes.INSERT
      });
      let insertLogStock = await this.connection.query(`insert into product_stock_log (product_stock_id,status, qty) values (${insertStock[0]}, 'in', ${e.qty})`, {
        raw: true,
        type: QueryTypes.INSERT
      });
    }
    if (insertProdukPurchaseItem[1]) {
      t.commit();
    } else {
      t.rollback();
    }
    return;
  }

  async findAll() {
    let purchase = await this.connection.query(`select * from product_purchase `, {
      raw: true,
      type: QueryTypes.SELECT,
      model: ProductPurchase,
      mapToModel: true
    });
    let dataPurchase = [];
    purchase.forEach((e) => {
      let data = {
        "id": e.id,
        "code": e.code,
        "sub_total": e.subTotal,
        "grand_total": e.grandTotal,
        "createdAt": e.createdAt,
        "updatedAt": e.updatedAt,
        "createdBy": e.createdBy,
        "items": []
      };
      dataPurchase.push(data);
    });
    for (const i of dataPurchase) {
      let purchase_item = await this.connection.query(`select * from product_purchase_item where product_purchase_id = ${i.id} `, {
        raw: true,
        model: ProductPurchaseItem,
        mapToModel: true,
        type: QueryTypes.SELECT
      });
      purchase_item.forEach((j) => {
        if (i.id === j.productPurchaseId) {
          i["items"].push(j);
        }
      });
    }
    return dataPurchase;
  }
}
