import { Injectable } from "@nestjs/common";
import { UpdateReportDto } from "./dto/update-report.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

@Injectable()
export class ReportService {
  constructor(
    private connection: Sequelize
  ) {
  }

  margin(type: string) {
    if (type == "DAY") {
      return this.connection.query("SELECT\n" +
        "\t(SELECT SUM(id) from `transaction` WHERE\n" +
        "\tcreatedAt BETWEEN date(NOW()) AND CURDATE() + INTERVAL 1 DAY) as today,\n" +
        "\t(SELECT SUM(id) from `transaction` WHERE\n" +
        "\tcreatedAt BETWEEN date(SUBDATE(NOW(2),2)) AND date(NOW())) as yesterday\n" +
        "FROM\n" +
        "\t`transaction`", { raw: true, type: QueryTypes.SELECT });
    } else if (type == "WEEK") {
      return this.connection.query("SELECT\n" +
        "\t(SELECT SUM(id) FROM `transaction`\n" +
        "WHERE date(createdAt) BETWEEN date(curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY) AND date(curdate() - INTERVAL DAYOFWEEK(curdate()) DAY)) as current_week,\n" +
        "\t(SELECT SUM(id) FROM `transaction`\n" +
        "WHERE createdAt >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY\n" +
        "AND createdAt< curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY) as last_week\n" +
        "FROM\n" +
        "\t`transaction`SELECT SUM(id) total_trx, week(createdAt) as day FROM `transaction` GROUP BY week", {
        raw: true,
        type: QueryTypes.SELECT
      });
    } else {
      return this.connection.query("SELECT\n" +
        "\t(SELECT SUM(id) from `transaction` WHERE\n" +
        "\tMONTH(createdAt) = month(NOW())) as current_month,\n" +
        "\t(SELECT SUM(id) from `transaction` WHERE\n" +
        "\tMONTH(createdAt) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)) as last_month\n" +
        "FROM\n" +
        "\t`transaction`\n" +
        "\t\n", { raw: true, type: QueryTypes.SELECT });
    }
  }

 async transaction(type: string) {
    if (type === "DAY") {
      return await this.connection.query("SELECT SUM(id) as total_trx, date(createdAt) as day FROM `transaction` GROUP BY day", {
        raw: true,
        type: QueryTypes.SELECT
      });
    } else if (type == "WEEK") {
      return await this.connection.query("SELECT SUM(id) as total_trx, week(createdAt) as week FROM `transaction` GROUP BY week", {
        raw: true,
        type: QueryTypes.SELECT
      });
    } else {
      return await this.connection.query("SELECT SUM(id) as total_trx, month(createdAt) as month FROM `transaction` GROUP BY month", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
  }


  async customer(type: string) {
    if (type === "DAY") {
      return await this.connection.query("SELECT SUM(id) as total_trx, date(createdAt) as day FROM `customer` GROUP BY day", {
        raw: true,
        type: QueryTypes.SELECT
      });
    } else if (type == "WEEK") {
      return await this.connection.query("SELECT SUM(id) as total_trx, week(createdAt) as week FROM `customer` GROUP BY week", {
        raw: true,
        type: QueryTypes.SELECT
      });
    } else {
      return await this.connection.query("SELECT SUM(id) as total_trx, month(createdAt) as month FROM `customer` GROUP BY month", {
        raw: true,
        type: QueryTypes.SELECT
      });
    }
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
