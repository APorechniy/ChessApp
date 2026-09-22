import { type ChessGameWithoutId } from "../types";
import { api } from "../../../axios";

export type CreateChessGameParams = {
    chessGame: ChessGameWithoutId,
}

type Response = {
    isCreatedChessGame: boolean;
};

type CreateChessGame = ({ chessGame }: CreateChessGameParams) => Promise<Response>;

const createChessGame: CreateChessGame = async ({ chessGame }) => {
    const response = await api.post(`/chess-games/`, {
        chessGame: chessGame
    });

    return response.data;
};

export default createChessGame;
