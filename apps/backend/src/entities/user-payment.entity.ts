import { Entity, Column } from "typeorm";

@Entity('user_payments')
export class UserPayment {
    @Column({ name: "user_id", type: 'varchar', length: 36, primary: true })
    userId!: string;

    @Column({ name: "payment_id", type: 'varchar', length: 36, primary: true })
    paymentId!: string;
}