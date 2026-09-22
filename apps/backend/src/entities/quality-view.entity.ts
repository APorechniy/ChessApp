import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    name: 'quality_view'
})
export class QualityView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    label!: string;

    @ViewColumn()
    labelFor!: string;

    @ViewColumn()
    lightColor!: string;

    @ViewColumn()
    darkColor!: string;
}