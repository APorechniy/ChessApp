import { type ChessOpeningWithoutId } from "../types";
import { api } from "../../../axios";

export type CreateChessOpeningParams = {
    chessOpening: ChessOpeningWithoutId,
}

type Response = {
    isCreatedChessOpening: boolean;
};

type CreateChessOpening = ({ chessOpening }: CreateChessOpeningParams) => Promise<Response>;

const createChessOpening: CreateChessOpening = async ({ chessOpening }) => {
    const response = await api.post(`/chess-openings/`, {
        chessOpening: chessOpening
    });

    return response.data;
};

export default createChessOpening;
