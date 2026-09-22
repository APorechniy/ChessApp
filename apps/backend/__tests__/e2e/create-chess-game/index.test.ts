import { ChessGamesRepository } from "@/repositories";
import { ChessGamesService } from "@/services";
import { TestDataSource } from "@/config/test-ormconfig";
import { ChessGame } from "@/entities/chess-game.entity";
import { ChessGameView } from "@/entities/chess-game-view.entity";

describe("Create chess game", () => {
    let chessGamesService: ChessGamesService;

    const chessGamePreset: Omit<ChessGameView, "id"> = {
        whitePlayer: "TestWhite",
        blackPlayer: "TestBlack",
        year: "1900",
        chessOpening: {
            "id": "02a0e5d9-e082-4dd4-b9af-3e301a1f677f",
            "name": "Сицилианская защита: Вариант Паульсена"
        },
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const chessOpeningsRepository = new ChessGamesRepository(dataSource);
        chessGamesService = new ChessGamesService(chessOpeningsRepository);
    })
    test("Create chess game", async () => {
        // Создаем игру
        const isCreatedChessGame = await chessGamesService.createChessGame(chessGamePreset);
        expect(isCreatedChessGame).toBeTruthy()

        // Проверяем что она есть в списке
        const list = await chessGamesService.getChessGames();
        expect(list).toContainEqual(expect.objectContaining({ ...chessGamePreset }));

        // Проверяем что она есть в фильтрованном списке
        const filteredListInclude = await chessGamesService.getChessGamesByChessOpeningId(chessGamePreset.chessOpening.id);
        expect(filteredListInclude).toContainEqual(expect.objectContaining({ ...chessGamePreset }));

        // Проверяем что ее нет в фильтрованном списке
        const filteredListExclude = await chessGamesService.getChessGamesByChessOpeningId("aaced261-7fe0-4235-b2a1-8f5beaff9e24");
        expect(filteredListExclude).not.toContainEqual(expect.objectContaining({ ...chessGamePreset }));
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const repo = TestDataSource.getRepository(ChessGame)
        repo.delete({
            whitePlayer: chessGamePreset.whitePlayer,
            blackPlayer: chessGamePreset.blackPlayer,
            year: chessGamePreset.year
        }).then(() => {
            TestDataSource.destroy()
        }).finally(() => {
            done();
        })
    })
})