import { ChessOpeningsRepository } from "../../src/repositories";
import { ChessOpeningsService } from "../../src/services";
import { ChessOpening } from "../../src/entities/chess-opening.entity";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import chessOpeningsList from "../mock/chess-openings-list.json"

describe("Chess Openings Service", () => {
    let chessOpeningsService: ChessOpeningsService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const chessOpeningsRepository = new ChessOpeningsRepository(dataSource);
        chessOpeningsService = new ChessOpeningsService(chessOpeningsRepository);
    })
    test("Get base chess openings", async () => {
        const mockedChessOpenings = EntityMockHelper.asEntityArray(ChessOpening, chessOpeningsList);

        const chessOpenings = await chessOpeningsService.getChessOpenings()

        expect(chessOpenings).toStrictEqual(mockedChessOpenings);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})