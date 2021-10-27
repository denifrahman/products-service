import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";
import { TransactionItems } from "./entities/transaction-item.entity";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    private connection: Sequelize
  ) {
  }

  async create(createTransactionDto: CreateTransactionDto) {
    let t = await this.connection.transaction();
    let insertTrx = await this.connection.query(`insert into transaction (sub_total,discount,grand_total,costumer_id,status) values (${createTransactionDto.subTotal}, ${createTransactionDto.discount}, ${createTransactionDto.grandTotal},${createTransactionDto.customerId}, ${createTransactionDto.status})`, {
      raw: true,
      type: QueryTypes.INSERT,
      transaction: t
    });
    for (const i of createTransactionDto.items) {
      i.transactionId = insertTrx[0];
      await this.connection.query(`insert into transaction_items (product_id,transaction_id,price) values (${i.productId}, ${i.transactionId}, ${i.price})`, {
        raw: true,
        transaction: t
      });
    }
    if (insertTrx[1]) {
      t.commit();
    } else {
      t.rollback();
    }
    return insertTrx;
  }

  async findAll() {
    let trx = await this.connection.query("select * from transaction", {
      raw: true,
      type: QueryTypes.SELECT,
      model: Transaction,
      mapToModel: true
    });
    let dataTrx = [];
    trx.forEach((e) => {
      let data = {
        "id": e.id,
        "status": e.status,
        "createdAt": e.createdAt,
        "updatedAt": e.updatedAt,
        "sub_total": e.subTotal,
        "discount": e.discount,
        "grand_total": e.grandTotal,
        "costumer_id": e.customerId,
        "items": []
      };
      dataTrx.push(data);
    });
    for (const i of dataTrx) {
      let trx_item = await this.connection.query(`select * from transaction_items where transaction_id = ${i.id} `, {
        raw: true,
        model: TransactionItems,
        mapToModel: true,
        type: QueryTypes.SELECT
      });
      trx_item.forEach((j) => {
        if (i.id === j.transactionId) {
          i["items"].push(j);
        }
      });
    }
    return dataTrx;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    let t = await this.connection.transaction();
    let trx = await this.connection.query(`update transaction set sub_total = '${updateTransactionDto.subTotal}', discount = '${updateTransactionDto.discount}', grand_total = '${updateTransactionDto.grandTotal}' where id = ${id}`, {
      raw: true,
      type: QueryTypes.UPDATE,
      transaction: t
    });
    this.connection.query(`delete from transaction_items where transaction_id = ${id}`, { raw: true, transaction: t });
    for (const i of updateTransactionDto.items) {
      i.transactionId = id;
      await this.connection.query(`insert into transaction_items (product_id,transaction_id,price) values (${i.productId}, ${i.transactionId}, ${i.price})`, {
        raw: true,
        transaction: t
      });
    }
    t.commit();
    return trx;
  }

  async updateStatus( updateTransactionDto: UpdateTransactionDto) {
    let t = await this.connection.transaction();
    let trx = await this.connection.query(`update transaction set status = '${updateTransactionDto.status}' where id = ${updateTransactionDto.id}`, {
      raw: true,
      type: QueryTypes.UPDATE,
      transaction: t
    });
    t.commit();
    return trx;
  }

  remove(id: number) {
    return this.connection.query(`delete from transaction where id = ${id}`);
  }
}
