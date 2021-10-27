import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

@Injectable()
export class CustomerService {
  constructor(
    private connection: Sequelize
  ) {
  }

  create(createCustomerDto: CreateCustomerDto) {
    return this.connection.query(`insert into customer (name, createdBy) values ('${createCustomerDto.name}', '${createCustomerDto.createdBy}')`, {raw:true, type:QueryTypes.INSERT});
  }

  findAll() {
    return this.connection.query(`select * from customer`, {raw:true, type:QueryTypes.SELECT});
  }
}
