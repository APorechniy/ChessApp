import { ChessOpeningsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import chessOpeningsList from "../mock/chess-openings-list.json"
import { ChessOpening } from "../../src/entities/chess-opening.entity";

describe("Chess Openings Repository", () => {
    let chessOpeningsRepository: ChessOpeningsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        chessOpeningsRepository = new ChessOpeningsRepository(dataSource);
    })
    test("Get base chess openings", async () => {
        const mockedChessOpenings = EntityMockHelper.asEntityArray(ChessOpening, chessOpeningsList);

        const chessOpenings = await chessOpeningsRepository.getChessOpenings()

        expect(chessOpenings).toStrictEqual(mockedChessOpenings);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})