export type Color = 'w' | 'b';
export type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface PieceDropHandlerArgs {
    sourceSquare: string;
    targetSquare?: string | null;
    piece: {
        pieceType: string; // e.g. "wP", "bK"
        isSparePiece?: boolean;
    };
}

export interface ChessTaskConstructorProps {
    taskId: string
}