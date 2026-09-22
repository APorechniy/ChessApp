import { SettingsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import settings from "../mock/settings.json";
import { SettingsView } from "@/entities";
import { SettingsService } from "@/services";

describe("Settings Service", () => {
    let settingsService: SettingsService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const settingsRepository = new SettingsRepository(dataSource);
        settingsService = new SettingsService(settingsRepository);
    })

    test("Get settings", async () => {
        const mockedSettings = EntityMockHelper.asEntity(SettingsView, settings);
        const mainSettings = await settingsService.getSettings()

        expect(mainSettings).toStrictEqual(mockedSettings);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})