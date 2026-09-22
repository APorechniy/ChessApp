import type {
  PaymentsRepository,
  SettingsRepository,
  StudentsBalanceTransactionRepository,
  StudentsRepository,
  UserBalanceRepository,
} from "../repositories";
import { type UkassaPayment } from "../types/Payments";
import { v4 as uuidv4 } from "uuid";
import { createUkassaPayment } from "@/utils/create-ukassa-payment";
import { type UserPaymentsRepository } from "../repositories/UserPaymentsRepository";
import { type StudentsBalanceTransaction } from "../entities/students-balance-transaction.entity";
import { localToUtc } from "../utils/local-to-utc";
import { utcToSql } from "../utils/utc-to-sql";
import { type Payment } from "../entities/payment.entity";

type ReturnType = {
  widgetId: string;
  paymentId: string;
};

export class PaymentsService {
  constructor(
    private paymentsRepository: PaymentsRepository,
    private settingsRepository: SettingsRepository,
    private studentsBalanceTransactionsRepository: StudentsBalanceTransactionRepository,
    private studentsRepository: StudentsRepository,
    private userPaymentsRepository: UserPaymentsRepository,
    private userBalanceRepository: UserBalanceRepository,
  ) { }

  async getPaymentStatusById(
    paymentId: string,
  ): Promise<UkassaPayment["status"]> {
    return await this.paymentsRepository.getPaymentStatusById(paymentId);
  }

  async createPayment(
    paymentCost: number,
    userId: string,
  ): Promise<ReturnType> {
    const settings = await this.settingsRepository.getUkassaSettings()

    if (!settings.ukassaIsConnected) {
      throw new Error('Ukassa is not connected')
    }

    if (!settings.ukassaId) {
      throw new Error('Shop ID not provided')
    }

    if (!settings.ukassaApiKey) {
      throw new Error('API key not provided')
    }

    const paymentId = uuidv4();
    const currentUser = await this.studentsRepository.getStudentById(userId);

    const description = `Оплата занятий для "${currentUser.firstName} ${currentUser.lastName}" - ${paymentCost} рублей`
    console.log('-------------')
    console.log(description)
    const payment = await createUkassaPayment(
      paymentCost,
      paymentId,
      settings.ukassaId,
      settings.ukassaApiKey,
      description
    );
    console.log('CREATED PAYMENT', payment)

    if (!payment) {
      throw new Error("Can not create payment");
    }

    const tranformedPayment: Payment = {
      id: payment.id,
      status: payment.status,
      amount_value: payment.amount.value,
      amount_currency: payment.amount.currency,
      description: payment.description,
      recipient_account_id: payment.recipient.account_id,
      recipient_gateway_id: payment.recipient.gateway_id,
      confirmation_type: payment.confirmation.type,
      confirmation_token: payment.confirmation.confirmation_token,
      test: payment.test,
      paid: payment.paid,
      refundable: payment.refundable,
      metadata: payment.metadata,
      created_at: payment.created_at,
    }

    const isCreatedPayment =
      await this.paymentsRepository.createPayment(tranformedPayment);

    if (!isCreatedPayment) {
      throw new Error("Can not create payment");
    }

    await this.userPaymentsRepository.createUserPayment({
      paymentId: payment.id,
      userId: userId,
    });

    return {
      widgetId: payment.confirmation.confirmation_token,
      paymentId: payment.id,
    };
  }

  async updatePaymentStatus({
    paymentStatus,
    payment,
  }: {
    paymentStatus: UkassaPayment["status"];
    payment: UkassaPayment;
  }): Promise<boolean> {
    if (paymentStatus === "succeeded") {
      const userId = await this.userPaymentsRepository.getUserIdByPaymentId(
        payment.id,
      );

      if (!userId) {
        throw new Error("Error: can not find user by payment");
      }

      const isUpdatePaymentStatus =
        await this.paymentsRepository.updatePaymentStatus({
          paymentStatus,
          paymentId: payment.id,
        });
      const isPutBalance =
        await this.userBalanceRepository.incrementUserBalance(
          userId,
          Number(payment.amount.value),
        );

      const transaction: StudentsBalanceTransaction = {
        id: uuidv4(),
        studentId: userId,
        paymentId: payment.id,
        type: "REPLENISHMENT",
        sum: Number(payment.amount.value),
        createdAt: utcToSql(localToUtc(new Date().toISOString()))
      }

      const isLoggedTransaction =
        await this.studentsBalanceTransactionsRepository.createStudentBalanceTransaction(transaction)

      return isPutBalance;
    } else {
      return await this.paymentsRepository.updatePaymentStatus({
        paymentStatus,
        paymentId: payment.id,
      });
    }
  }
}
