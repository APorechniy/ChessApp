import { type Repository, type DataSource } from "typeorm";
import { Settings } from "../entities/settings.entity";
import { SettingsView } from "../entities/settings-view.entity";

export class SettingsRepository {
    private tableRepo: Repository<Settings>;
    private viewRepo: Repository<SettingsView>

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(Settings);
        this.viewRepo = dataSource.getRepository(SettingsView);
    }

    async getSettings() {
        const [settings] = await this.viewRepo.find({
            select: {
                id: true,
                name: true,
                logo: true,
                vkLink: true,
                email: true,
                legalName: true,
                itin: true,
                phone: true,
                ukassaIsConnected: true
            },
            take: 1
        })

        return settings;
    }

    async getUkassaSettings() {
        const [settings] = await this.viewRepo.find({
            select: {
                id: true,
                name: true,
                ukassaApiKey: true,
                ukassaId: true,
                ukassaIsConnected: true
            },
            take: 1
        })

        return settings;
    }

    async updateSettings(settings: Settings) {
        const updatedSettings = await this.tableRepo.update({ id: settings.id }, settings)

        return Boolean(updatedSettings);
    }
}
