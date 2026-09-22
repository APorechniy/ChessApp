import { SettingsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import settings from "../mock/settings.json";
import ukassaSettings from "../mock/ukassa-settings.json";
import { SettingsView } from "@/entities";

describe("Settings Repository", () => {
    let settingsRepository: SettingsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        settingsRepository = new SettingsRepository(dataSource);
    })

    test("Get settings", async () => {
        const mockedSettings = EntityMockHelper.asEntity(SettingsView, settings);
        const mainSettings = await settingsRepository.getSettings()

        expect(mainSettings).toStrictEqual(mockedSettings);
    })
    test("Get UKassa settings", async () => {
        const mockedUkassaSettings = EntityMockHelper.asEntity(SettingsView, ukassaSettings);
        const mainUkassaSettings = await settingsRepository.getUkassaSettings()

        expect(mainUkassaSettings).toStrictEqual(mockedUkassaSettings);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})