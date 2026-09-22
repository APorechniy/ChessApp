import { Entity, Column } from "typeorm";

@Entity('user_balance')
export class UserBalance {
    @Column({ name: "user_id", type: 'varchar', length: 36, primary: true })
    userId!: string;

    @Column({
        name: 'balance',
        type: 'decimal',
        transformer: {
            to: (value: number): string => value.toString(),
            from: (value: string): number => parseFloat(value)
        }
    })
    balance!: number
}