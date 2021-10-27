import { Column } from "sequelize-typescript";

export class CreateProductDto {

  sku: number;

  name: string;

  image: string;

  description: string;

  createdBy: string;
}
