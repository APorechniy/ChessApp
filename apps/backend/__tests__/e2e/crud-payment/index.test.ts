import { PaymentsRepository, SettingsRepository, StudentsBalanceTransactionRepository, StudentsRepository, TasksRepository, UserBalanceRepository, UserPaymentsRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { PaymentsService, UserBalanceService, UserPaymentsService } from "@/services";
import { UkassaPayment } from "@/types/Payments";
import * as ukassaModule from '@/utils/create-ukassa-payment';
import { Payment, StudentsBalanceTransaction, UserBalance, UserPayment } from "@/entities";

jest.mock('@/utils/create-ukassa-payment', () => ({
    createUkassaPayment: jest.fn()
}));

describe("CRUD payments", () => {
    let paymentsService: PaymentsService;
    let userBalanceService: UserBalanceService;
    let userPaymentsService: UserPaymentsService

    const studentId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"
    const paymentPreset: UkassaPayment = {
        id: "3015f7cf-000f-5000-b000-11f866ee9fdw",
        status: "pending",
        amount: {
            value: "1500",
            currency: "RUB",
        },
        description: `Оплата занятий для "Студент Студент" - 1500 рублей`,
        recipient: {
            account_id: "1130000",
            gateway_id: "2496965",
        },
        confirmation: {
            type: "embedded",
            confirmation_token: "ct-3015f7cf-000f-5000-b000-11f866ee9c0f",
        },
        test: true,
        paid: false,
        refundable: false,
        metadata: {},
        created_at: "2026-02-25 15:07:43"
    }

    const paymentHistoryMock = {
        "payment": {
            "amountValue": "1500",
            "createdAt": "2026-02-25 10:07:43.000000",
            "id": "3015f7cf-000f-5000-b000-11f866ee9fdw",
            "status": "succeeded"
        },
        "user": {
            "firstName": "Студент",
            "id": "bd40d71a-dbd2-4f43-873f-e6d767d722f3",
            "lastName": "Студент"
        }
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const paymentsRepository = new PaymentsRepository(dataSource);
        const settingsRepository = new SettingsRepository(dataSource);
        const studentBalanceTransactionsRepository = new StudentsBalanceTransactionRepository(dataSource);
        const studentsRepository = new StudentsRepository(dataSource);
        const userPaymentsRepository = new UserPaymentsRepository(dataSource);
        const userBalanceRepository = new UserBalanceRepository(dataSource);

        userBalanceService = new UserBalanceService(
            userBalanceRepository
        )
        userPaymentsService = new UserPaymentsService(
            userPaymentsRepository
        )
        paymentsService = new PaymentsService(
            paymentsRepository,
            settingsRepository,
            studentBalanceTransactionsRepository,
            studentsRepository,
            userPaymentsRepository,
            userBalanceRepository,
        );
    })
    test("CRUD payments", async () => {
        // @ts-ignore
        ukassaModule.createUkassaPayment.mockReturnValue(paymentPreset);
        // Создаем платеж
        const {
            widgetId,
            paymentId
        } = await paymentsService.createPayment(1500, studentId);
        expect(paymentId).toBeTruthy()
        expect(widgetId).toBe(paymentPreset.confirmation.confirmation_token);

        // Проверяем что платеж создался
        const paymentStatus = await paymentsService.getPaymentStatusById(paymentId);
        expect(paymentStatus).toBe("pending")

        // Имитируем смену статуса по хуку
        const isUpdated = await paymentsService.updatePaymentStatus({
            paymentStatus: "succeeded",
            payment: paymentPreset
        })
        expect(isUpdated).toBeTruthy();

        // Проверяем что статус сменился
        const paymentStatusUpdated = await paymentsService.getPaymentStatusById(paymentId);
        expect(paymentStatusUpdated).toBe("succeeded")

        // Проверяем, что баланс прибавился
        const userBalance = await userBalanceService.getUserBalance(studentId);
        expect(userBalance.balance).toBe(750)

        // Проверяем, что платеж появился в истории
        const userPayments = await userPaymentsService.getUserPaymentsHistory("Студент")
        expect(userPayments).toContainEqual(expect.objectContaining({
            ...paymentHistoryMock
        }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const paymentRepo = TestDataSource.getRepository(Payment)
        const userPaymentsRepo = TestDataSource.getRepository(UserPayment)
        const userBalanceRepo = TestDataSource.getRepository(UserBalance)
        const studentBalanceTransactionsRepo = TestDataSource.getRepository(StudentsBalanceTransaction)

        studentBalanceTransactionsRepo.delete({
            studentId: studentId,
            paymentId: paymentPreset.id,
        }).then(() => {
            userBalanceRepo.update({
                userId: studentId,
            }, { balance: -750 }).then(() => {
                userPaymentsRepo.delete({
                    paymentId: paymentPreset.id
                }).then(() => {
                    paymentRepo.delete({
                        id: paymentPreset.id
                    })
                        .then(() => {
                            TestDataSource.destroy()
                        })
                        .finally(() => {
                            done();
                        })
                })
            })
        })
    })
})