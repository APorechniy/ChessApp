import type { RequestStatus } from "../../types/types";
import { ChessOpening } from "../chess-openings/types";

export type ChessGame = {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    year: string;
    chessOpening: ChessOpening;
}

export type ChessGameWithoutId = Omit<ChessGame, "id">

export type ChessGamesState = {
    chessGamesList: ChessGame[],

    isLoadingChessGamesList: RequestStatus,
    isCreateChessGame: RequestStatus,
}