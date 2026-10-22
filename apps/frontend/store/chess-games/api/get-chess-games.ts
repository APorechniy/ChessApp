import { type ChessGame } from "../types";
import { api } from "../../../network/instance";

export type GetChessGamesParams = {
    chessOpeningId?: string
}

type Response = {
    chessGamesList: ChessGame[];
};

type GetChessGames = ({ chessOpeningId }: GetChessGamesParams) => Promise<Response>;

const getChessGames: GetChessGames = async ({ chessOpeningId }) => {
    const response = await api.get(`/chess-games/${chessOpeningId ? `?chessOpeningId=${chessOpeningId}` : ""}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getChessGames;
