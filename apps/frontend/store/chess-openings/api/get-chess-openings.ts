import { type ChessOpening } from "../types";
import { api } from "../../../axios";

type Response = {
    chessOpeningsList: ChessOpening[];
};

type GetChessOpenings = () => Promise<Response>;

const getChessOpenings: GetChessOpenings = async () => {
    const response = await api.get(`/chess-openings/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getChessOpenings;
