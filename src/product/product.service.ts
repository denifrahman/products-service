import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./entities/product.entity";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";
import { ProductPurchaseItem } from "../product-purchase/entities/product-purchase-item.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private produk: typeof Product,
    private connection: Sequelize
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    let today = new Date();
    const t = await this.connection.transaction();
    let insertProduct = await this.connection.query(`insert into product (name, sku, image, description, createdBy) values ('${createProductDto.name}', '${createProductDto.sku}', '${createProductDto.image}', '${createProductDto.description}', '${createProductDto.createdBy}')`, {
      raw: true,
      type: QueryTypes.INSERT,
      transaction: t
    });
    if (insertProduct[0]) {
      t.commit();
    } else {
      t.rollback();
    }
    return insertProduct;
  }

  async findAll(param) {
    let product = await this.connection.query("select * from product", {
      raw: true,
      type: QueryTypes.SELECT,
      model: Product,
      mapToModel: true
    });
    let price = await this.connection.query("select (purchase_price * qty) as price, product_id from product_purchase_item", {
      raw: true, type: QueryTypes.SELECT, model: ProductPurchaseItem,
      mapToModel: true
    });
    let response = [];
    price.forEach((e) => {
      product.forEach((i) => {
        if (i.id === e.produkId) {
          i["price"] = e["price"];
        }
        response.push(i);
      });
    });
    return response;
  }


}
