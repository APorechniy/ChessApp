import { ViewEntity, ViewColumn } from "typeorm";
import { type LevelView } from "./level-view.entity";

@ViewEntity('student_view')
export class StudentView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    firstName!: string;

    @ViewColumn()
    lastName!: string;

    @ViewColumn()
    birthDate?: string | null;

    @ViewColumn()
    level!: LevelView;

    @ViewColumn()
    fshrId?: number | null;

    @ViewColumn()
    fideId?: number | null;

    @ViewColumn()
    phone?: string | null;

    @ViewColumn()
    email?: string | null;

    @ViewColumn()
    joinDate?: string | null;

    @ViewColumn()
    notes?: string | null;

    @ViewColumn()
    paidLessons?: number | null;

    @ViewColumn({
        transformer: {
            to: (value: boolean): number => value ? 1 : 0,
            from: (value: number): boolean => Boolean(value)
        }
    })
    isExcluded!: boolean;

    @ViewColumn({
        transformer: {
            to: (value: number): string => `${value}`,
            from: (value: string): number => {
                if (value === null) return 0
                else return Number(value)
            }
        }
    })
    balance?: number | null;
}