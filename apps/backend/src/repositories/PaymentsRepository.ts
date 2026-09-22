import { type Repository, type DataSource } from "typeorm";
import { type UkassaPayment } from "../types/Payments";
import { Payment } from "../entities/payment.entity";

export class PaymentsRepository {
  private tableRepo: Repository<Payment>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(Payment);
  }

  async getPaymentStatusById(
    paymentId: string,
  ): Promise<UkassaPayment["status"]> {
    const [payment] = await this.tableRepo.find({
      where: {
        id: paymentId
      }
    })

    return payment.status;
  }

  async createPayment(payment: Payment) {
    const createdPayment = this.tableRepo.create(payment);

    return await this.tableRepo.save(createdPayment);
  }

  async updatePaymentStatus({
    paymentStatus,
    paymentId,
  }: {
    paymentStatus: UkassaPayment["status"];
    paymentId: string;
  }): Promise<boolean> {
    const isUpdatePaymentStatus = await this.tableRepo.update({ id: paymentId }, { status: paymentStatus })

    return Boolean(isUpdatePaymentStatus);
  }
}
