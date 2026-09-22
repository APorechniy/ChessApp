import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'level_view'
})
export class LevelView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    hoursRequired!: number

    @ViewColumn()
    description?: string
}