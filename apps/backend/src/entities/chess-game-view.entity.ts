import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'chess_game_view',
})
export class ChessGameView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    whitePlayer!: string;

    @ViewColumn()
    blackPlayer!: string;

    @ViewColumn()
    year!: string;

    @ViewColumn()
    chessOpening!: {
        id: string;
        name: string;
    };
}