import { SettingsRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { SettingsService } from "@/services";
import { SettingsView } from "@/entities";
import { EntityMockHelper } from "../../helpers/entity-mock-helper";

describe("Update settings", () => {
    let settingsService: SettingsService;

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const settingsRepository = new SettingsRepository(dataSource);
        settingsService = new SettingsService(settingsRepository);
    })
    test("Update settings", async () => {
        // Получаем текущие настройки
        const settings = await settingsService.getSettings();
        expect(settings).toBeTruthy()

        const updatedSettings: SettingsView = {
            ...settings as SettingsView,
            name: "NEW TEST NAME",
            phone: "+79199199119",
            legalName: "TESTLEGAL",
        }

        const mockedUpdatedSettings = EntityMockHelper.asEntity(SettingsView, updatedSettings);

        // Обновляем настройки
        const isUpdated = await settingsService.updateSettings(mockedUpdatedSettings);
        expect(isUpdated).toBeTruthy();

        // Проверяем обновленные настройки
        const updatedMainSettings = await settingsService.getSettings();
        expect(updatedMainSettings).toStrictEqual(mockedUpdatedSettings)

        // Делаем Rollback
        const isRollbackSettings = await settingsService.updateSettings(settings as SettingsView);
        expect(isRollbackSettings).toBeTruthy();

        // Проверяем Rollback
        const rollbackedSettings = await settingsService.getSettings();
        expect(rollbackedSettings).toStrictEqual(settings)
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy();
        done();
    })
})