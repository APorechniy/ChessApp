import { type Repository, type DataSource } from "typeorm";
import { StudentsBalanceTransaction } from "../entities/students-balance-transaction.entity";

export class StudentsBalanceTransactionRepository {
  private tableRepo: Repository<StudentsBalanceTransaction>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(StudentsBalanceTransaction);
  }

  async createStudentBalanceTransaction(transaction: StudentsBalanceTransaction): Promise<boolean> {
    let createdTransaction = null;

    if (transaction.type === "REPLENISHMENT") {
      createdTransaction = await this.tableRepo.create({
        id: transaction.id,
        studentId: transaction.studentId,
        paymentId: transaction.paymentId,
        type: transaction.type,
        sum: transaction.sum,
        createdAt: transaction.createdAt,
      });
    } else {
      createdTransaction = await this.tableRepo.create({
        id: transaction.id,
        studentId: transaction.studentId,
        attendanceId: transaction.attendanceId,
        type: transaction.type,
        sum: transaction.sum,
        createdAt: transaction.createdAt,
      });
    }

    return Boolean(await this.tableRepo.save(createdTransaction));
  }
}
