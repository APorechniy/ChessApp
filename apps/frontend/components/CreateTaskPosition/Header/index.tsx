import React from 'react';
import * as S from './styled';
import { useRouter } from 'next/router';

interface HeaderProps {
    onClear: () => void;
    onResetToStart: () => void;
    onSave: () => void;
    taskName: string;
    isDisabledButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onClear, onResetToStart, onSave, taskName, isDisabledButton }) => {
    const router = useRouter()

    const handleBack = () => router.back()

    return (
        <S.Container>
            <S.Button onClick={handleBack} whileTap={{ scale: 0.95 }}>
                Назад
            </S.Button>
            <S.TitleGroup>
                <S.Title>{taskName}</S.Title>
                <S.Subtitle>Расставьте фигуры или укажите FEN нотацию</S.Subtitle>
            </S.TitleGroup>

            <S.ButtonGroup>
                <S.Button $variant="danger" onClick={onClear} whileTap={{ scale: 0.95 }}>
                    Очистить
                </S.Button>
                <S.Button onClick={onResetToStart} whileTap={{ scale: 0.95 }}>
                    Начальная позиция
                </S.Button>
                <S.Button $variant="primary" onClick={onSave} whileTap={{ scale: 0.95 }} disabled={isDisabledButton}>
                    Сохранить позицию
                </S.Button>
            </S.ButtonGroup>
        </S.Container>
    );
};