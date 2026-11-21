export type ChessOpening = {
    id: string,
    name: string
}

export type ChessOpeningWithoutId = Omit<ChessOpening, "id">

export type ChessOpeningsState = {
    chessOpeningsList: ChessOpening[],
}