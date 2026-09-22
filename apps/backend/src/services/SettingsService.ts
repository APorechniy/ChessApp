import type { SettingsRepository } from "../repositories";
import { type Settings } from "../entities/settings.entity";

export class SettingsService {
    constructor(
        private settingsRepository: SettingsRepository
    ) { }

    async getSettings(): Promise<Settings | null> {
        try {
            const settings =
                await this.settingsRepository.getSettings();

            return settings;
        } catch (error) {
            console.log("Cannot get settings", error)
            return null
        }
    }

    async updateSettings(settings: Settings): Promise<boolean> {
        return await this.settingsRepository.updateSettings(settings);
    }
}
