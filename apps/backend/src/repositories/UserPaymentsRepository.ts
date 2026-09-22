import { type Repository, type DataSource, Raw } from "typeorm";
import { UserPayment } from "../entities/user-payment.entity";
import { UserPaymentView } from "../entities/user-payment-view.entity";

export class UserPaymentsRepository {
  private tableRepo: Repository<UserPayment>;
  private viewRepo: Repository<UserPaymentView>;

  constructor(dataSource: DataSource) {
    this.tableRepo = dataSource.getRepository(UserPayment);
    this.viewRepo = dataSource.getRepository(UserPaymentView);
  }

  async getUserPaymentsHistory(search?: string) {
    const queryBuilder = this.viewRepo
      .createQueryBuilder("upv")
      .where(`JSON_EXTRACT(upv.payment, '$.status') = "succeeded"`)
      .orderBy(`JSON_EXTRACT(upv.payment, '$.createdAt')`, "DESC")
      .limit(30);

    // Добавляем поиск, если передан параметр search
    if (search) {
      queryBuilder.andWhere(
        `(LOWER(JSON_EXTRACT(upv.user, '$.firstName')) LIKE LOWER(:search) 
          OR LOWER(JSON_EXTRACT(upv.user, '$.lastName')) LIKE LOWER(:search))`,
        { search: `%${search}%` }
      );
    }

    return await queryBuilder.getMany();
  }

  async getUserIdByPaymentId(paymentId: string) {
    const rows = await this.tableRepo.findOne({
      select: {
        userId: true,
        paymentId: false,
      },
      where: {
        paymentId: paymentId
      }
    })

    return rows?.userId;
  }

  async createUserPayment({
    paymentId,
    userId,
  }: {
    paymentId: string;
    userId: string;
  }): Promise<boolean> {
    const createdUserPayment = this.tableRepo.create({
      userId: userId,
      paymentId: paymentId,
    })

    return Boolean(await this.tableRepo.save(createdUserPayment));
  }
}
