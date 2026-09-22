import { Entity, Column } from "typeorm";

@Entity('settings')
export class Settings {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100, default: "Клуб" })
    name!: string;

    @Column({ name: 'logo', type: 'varchar', length: 200, nullable: true })
    logo?: string | null;

    @Column({ name: 'vk_link', type: 'varchar', length: 100, nullable: true })
    vkLink?: string | null;

    @Column({ name: 'email', type: 'varchar', length: 50, nullable: true })
    email?: string | null;

    @Column({ name: 'legal_name', type: 'varchar', length: 200, nullable: true })
    legalName?: string | null;

    @Column({ name: 'itin', type: 'varchar', length: 12, nullable: true })
    itin?: string | null;

    @Column({ name: 'ukassa_id', type: 'varchar', length: 10, nullable: true })
    ukassaId?: string | null;

    @Column({ name: 'ukassa_api_key', type: 'varchar', length: 100, nullable: true })
    ukassaApiKey?: string | null;

    @Column({ name: 'phone', type: 'varchar', length: 12, nullable: true })
    phone?: string | null;

    @Column({ name: 'ukassa_is_connected', type: 'boolean', nullable: true })
    ukassaIsConnected?: boolean | null;
}