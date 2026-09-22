import { Entity, Column } from "typeorm";

@Entity('quality')
export class Quality {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name!: string;

    @Column({ name: 'label', type: 'varchar', length: 50 })
    label!: string;

    @Column({ name: 'label_for', type: 'varchar', length: 50 })
    labelFor!: string;

    @Column({ name: 'light_color', type: 'varchar', length: 6 })
    lightColor!: string;

    @Column({ name: 'dark_color', type: 'varchar', length: 6 })
    darkColor!: string;
}