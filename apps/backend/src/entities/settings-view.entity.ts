import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    name: 'settings_view'
})
export class SettingsView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    logo?: string | null;

    @ViewColumn()
    vkLink?: string | null;

    @ViewColumn()
    email?: string | null;

    @ViewColumn()
    legalName?: string | null;

    @ViewColumn()
    itin?: string | null;

    @ViewColumn()
    ukassaId?: string | null;

    @ViewColumn()
    ukassaApiKey?: string | null;

    @ViewColumn()
    phone?: string | null;

    @ViewColumn({
        transformer: {
            to: (value: boolean): number => value ? 1 : 0,
            from: (value: number): boolean => Boolean(value)
        }
    })
    ukassaIsConnected?: boolean | null;
}