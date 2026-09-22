import { ViewEntity, ViewColumn } from "typeorm";
import { type Student } from "./student.entity";
import { type Payment } from "./payment.entity";

@ViewEntity({
    name: 'user_payments_view'
})
export class UserPaymentView {
    @ViewColumn()
    user!: {
        id: Student["id"],
        firstName: Student["firstName"],
        lastName: Student["lastName"],
    };

    @ViewColumn()
    payment!: {
        id: Payment["id"],
        amountValue: Payment["amount_value"],
        status: Payment["status"],
        createdAt: Payment["created_at"]
    };
}