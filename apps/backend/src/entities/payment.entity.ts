import { Entity, Column } from "typeorm";

@Entity('payments')
export class Payment {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'status', type: 'enum', enum: ['waiting_for_capture', 'pending', 'succeeded', 'canceled'] })
    status!: "canceled" | "waiting_for_capture" | "succeeded" | "pending";

    @Column({ name: 'amount_value', type: 'varchar', length: 50, nullable: true })
    amount_value!: string;

    @Column({ name: 'amount_currency', type: 'varchar', length: 5 })
    amount_currency!: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'recipient_account_id', type: 'varchar', length: 50, nullable: true })
    recipient_account_id!: string;

    @Column({ name: 'recipient_gateway_id', type: 'varchar', length: 50, nullable: true })
    recipient_gateway_id!: string;

    @Column({ name: 'confirmation_type', type: 'varchar', length: 30 })
    confirmation_type!: string;

    @Column({ name: 'confirmation_token', type: 'varchar', length: 100 })
    confirmation_token!: string;

    @Column({ name: 'test', type: 'boolean' })
    test!: boolean;

    @Column({ name: 'paid', type: 'boolean' })
    paid!: boolean;

    @Column({ name: 'refundable', type: 'boolean' })
    refundable!: boolean;

    @Column({ name: 'metadata', type: 'text' })
    metadata!: string;

    @Column({ name: "created_at", type: "timestamp" })
    created_at!: string;
}