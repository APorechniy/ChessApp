import { Entity, Column } from "typeorm";

@Entity('users')
export class User {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'username', type: 'varchar', length: 50, unique: true })
    username!: string;

    @Column({ name: "password", type: 'varchar', length: 100, select: false })
    password!: string

    @Column({ name: "role", type: 'enum', enum: ['admin', 'coach', 'student'] })
    role!: 'admin' | 'coach' | 'student'
}