import React from 'react';
import { SparePiece } from 'react-chessboard';
import * as S from './styled';
import { Color } from '../types';
import { WHITE_PIECES, BLACK_PIECES } from '../utils/chess-helpers';

interface SidebarProps {
    turn: Color;
    fenString: string;
    onTurnChange: (turn: Color) => void;
    onFenChange: (fen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    turn,
    fenString,
    onTurnChange,
    onFenChange,
}) => {
    return (
        <S.Container>
            {/* Выбор чей ход */}
            <S.Section>
                <S.SectionTitle>Очередь хода</S.SectionTitle>
                <S.TurnSelector>
                    <S.TurnButton $active={turn === 'w'} onClick={() => onTurnChange('w')}>
                        Ход белых
                    </S.TurnButton>
                    <S.TurnButton $active={turn === 'b'} onClick={() => onTurnChange('b')}>
                        Ход черных
                    </S.TurnButton>
                </S.TurnSelector>
            </S.Section>

            {/* Белые фигуры для перетаскивания */}
            <S.Section>
                <S.SectionTitle>Белые фигуры</S.SectionTitle>
                <S.SparePiecesGrid>
                    {WHITE_PIECES.map((pieceType) => (
                        <S.SparePieceWrapper key={pieceType}>
                            <SparePiece pieceType={pieceType} />
                        </S.SparePieceWrapper>
                    ))}
                </S.SparePiecesGrid>
            </S.Section>

            {/* Черные фигуры для перетаскивания */}
            <S.Section>
                <S.SectionTitle>Черные фигуры</S.SectionTitle>
                <S.SparePiecesGrid>
                    {BLACK_PIECES.map((pieceType) => (
                        <S.SparePieceWrapper key={pieceType}>
                            <SparePiece pieceType={pieceType} />
                        </S.SparePieceWrapper>
                    ))}
                </S.SparePiecesGrid>
            </S.Section>

            {/* Поле FEN нотации */}
            <S.Section>
                <S.SectionTitle>FEN Нотация</S.SectionTitle>
                <S.FenInput
                    value={fenString}
                    onChange={(e) => onFenChange(e.target.value)}
                />
            </S.Section>
        </S.Container>
    );
};