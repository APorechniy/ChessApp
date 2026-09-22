import { Entity, Column } from "typeorm";

@Entity('chess_games')
export class ChessGame {
    @Column({ type: 'varchar', length: 36, primary: true })
    id!: string;

    @Column({ name: 'white_player', type: 'varchar', length: 100 })
    whitePlayer!: string;

    @Column({ name: 'black_player', type: 'varchar', length: 100 })
    blackPlayer!: string;

    @Column({ type: 'varchar', length: 50 })
    year!: string;

    @Column({ name: 'chess_opening_id', type: 'varchar', length: 36 })
    chessOpeningId!: string;
}