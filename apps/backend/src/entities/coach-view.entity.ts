import { AfterLoad, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'coach_view'
})
export class CoachView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    firstName!: string;

    @ViewColumn()
    lastName!: string;

    @ViewColumn()
    birthDate!: string;

    @ViewColumn()
    avatar?: string | null;

    @ViewColumn()
    phone?: string | null;

    @ViewColumn()
    email?: string | null;

    @ViewColumn()
    biography?: string | null;

    @ViewColumn()
    fshrId?: number | null;

    @ViewColumn()
    fideId?: number | null;

    @ViewColumn()
    joinDate!: string;

    @ViewColumn({
        transformer: {
            to: (value: boolean): boolean => value,
            from: (value: number): boolean => Boolean(value)
        }
    })
    isFired?: boolean | null;
}