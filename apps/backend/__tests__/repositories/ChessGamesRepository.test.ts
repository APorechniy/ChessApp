import { ChessGamesRepository } from "../../src/repositories";
import chessGamesList from "../mock/chess-games-list.json"
import chessGamesFilteredList from "../mock/chess-games-list-filtered.json"
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { ChessGameView } from "../../src/entities/chess-game-view.entity";

describe("Chess Games Repository", () => {
    let chessGamesRepository: ChessGamesRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        chessGamesRepository = new ChessGamesRepository(dataSource);
    })

    test("Get base chess games", async () => {
        const mockedChessGames = EntityMockHelper.asEntityArray(ChessGameView, chessGamesList);
        const chessGames = await chessGamesRepository.getChessGames()

        expect(chessGames).toStrictEqual(mockedChessGames);
    })

    test("Get filtered chess games", async () => {
        const mockedChessGames = EntityMockHelper.asEntityArray(ChessGameView, chessGamesFilteredList);
        const chessGames = await chessGamesRepository.getChessGamesByChessOpeningId("6ef5a3fc-e968-46c5-9ced-07b028c240e1")

        expect(chessGames).toStrictEqual(mockedChessGames);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})