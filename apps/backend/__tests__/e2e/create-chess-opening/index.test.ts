import { ChessOpeningsRepository } from "@/repositories";
import { ChessOpeningsService } from "@/services";
import { TestDataSource } from "@/config/test-ormconfig";
import { ChessOpening } from "@/entities/chess-opening.entity";

describe("Create chess opening", () => {
    let chessOpeningsService: ChessOpeningsService;
    const chessOpeningName = "Test chess opening"
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const chessOpeningsRepository = new ChessOpeningsRepository(dataSource);
        chessOpeningsService = new ChessOpeningsService(chessOpeningsRepository);
    })
    test("Create chess opening", async () => {
        const chessOpeningPreset: Omit<ChessOpening, "id"> = {
            name: chessOpeningName
        }

        const isCreatedChessOpening = await chessOpeningsService.createChessOpening(chessOpeningPreset);
        expect(isCreatedChessOpening).toBeTruthy()

        const list = await chessOpeningsService.getChessOpenings();
        expect(list).toContainEqual(expect.objectContaining({ name: chessOpeningName }));
    })

    test("Dont create invalid chess opening", async () => {
        const chessOpeningPreset = {
            name: null
        } as unknown as Omit<ChessOpening, "id">

        const fn = chessOpeningsService.createChessOpening.bind(chessOpeningsService, chessOpeningPreset);
        await expect(fn).rejects.toThrow()
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const repo = TestDataSource.getRepository(ChessOpening)
        repo.delete({
            name: chessOpeningName
        }).then(() => {
            TestDataSource.destroy()
        }).finally(() => {
            done();
        })
    })
})