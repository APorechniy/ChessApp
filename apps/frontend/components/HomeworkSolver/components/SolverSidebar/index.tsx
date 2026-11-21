import React, { FC } from "react";
import * as S from "./styled";
import { TextButton } from "../../../../atoms/TextButton";

interface SolverSidebarProps {
    taskName: string;
    isWhiteTurn: boolean;
    moves: string[];
    initialStartsWhite: boolean;
    isLastTask: boolean;
    hasMoveMade: boolean;
    onResetMove: () => void;
    onNext: () => void;
    onPrev: () => void;
    canGoBack: boolean;
}

export const SolverSidebar: FC<SolverSidebarProps> = ({
    taskName,
    isWhiteTurn,
    moves,
    initialStartsWhite,
    isLastTask,
    hasMoveMade,
    onResetMove,
    onNext,
    onPrev,
    canGoBack,
}) => {
    // Форматирование ходов парами: 1. e4 e5  2. Nf3 Nc6
    const renderFormattedMoves = () => {
        if (!moves.length) {
            return <S.EmptyMovesText>Сделайте первый ход на доске...</S.EmptyMovesText>;
        }

        const elements: React.ReactNode[] = [];
        let moveIndex = 0;
        let stepNumber = 1;

        // Если начальный ход был за черных
        if (!initialStartsWhite && moves.length > 0) {
            elements.push(
                <S.MoveItem key="first-black">
                    <span className="number">1...</span>
                    <span>{moves[0]}</span>
                </S.MoveItem>
            );
            moveIndex = 1;
            stepNumber = 2;
        }

        for (let i = moveIndex; i < moves.length; i += 2) {
            const whiteMove = moves[i];
            const blackMove = moves[i + 1];

            elements.push(
                <S.MoveItem key={`move-${stepNumber}`}>
                    <span className="number">{stepNumber}.</span>
                    <span>{whiteMove}</span>
                    {blackMove && <span>{blackMove}</span>}
                </S.MoveItem>
            );
            stepNumber++;
        }

        return elements;
    };

    return (
        <S.SidebarWrapper>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                <S.TaskMeta>
                    <S.TaskTitle>{taskName}</S.TaskTitle>
                    <S.TurnIndicator $isWhiteTurn={isWhiteTurn}>
                        Очередь хода: {isWhiteTurn ? "Белые" : "Черные"}
                    </S.TurnIndicator>
                </S.TaskMeta>

                {/* Нотация ходов */}
                <S.NotationBlock>
                    <S.NotationLabel>Нотация решения:</S.NotationLabel>
                    <S.MovesContainer>{renderFormattedMoves()}</S.MovesContainer>
                </S.NotationBlock>

                <S.InstructionCard>
                    <S.InstructionHeading>Инструкция к решению</S.InstructionHeading>
                    <S.InstructionText>
                        1. Выполняйте ходы за обе стороны по очереди прямо на доске.
                        <br />
                        2. Все сделанные ходы отображаются в блоке нотации выше.
                        <br />
                        3. Кнопка «Сбросить решение» очистит ход партии к началу.
                    </S.InstructionText>
                </S.InstructionCard>
            </div>

            <S.ActionsContainer>
                {hasMoveMade && (
                    <TextButton
                        text="Сбросить решение"
                        onClick={onResetMove}
                        backgroundColor="var(--secondary-background-light)"
                        style={{
                            width: "100%",
                            padding: "1.2rem",
                            borderRadius: "1rem",
                            fontSize: "1.4rem",
                            color: "var(--primary-text)",
                        }}
                    />
                )}

                <S.ButtonRow>
                    {canGoBack && (
                        <TextButton
                            text="Назад"
                            onClick={onPrev}
                            backgroundColor="var(--secondary-background-light)"
                            style={{
                                flex: 1,
                                padding: "1.4rem",
                                borderRadius: "1rem",
                                fontSize: "1.4rem",
                                color: "var(--primary-text)",
                            }}
                        />
                    )}

                    <TextButton
                        text={isLastTask ? "Отправить на проверку" : "Далее"}
                        onClick={onNext}
                        disabled={!hasMoveMade}
                        backgroundColor={
                            isLastTask ? "var(--primary-orange)" : "var(--primary-btn-color)"
                        }
                        style={{
                            flex: 2,
                            padding: "1.4rem",
                            borderRadius: "1rem",
                            fontSize: "1.4rem",
                            fontWeight: 600,
                            color: "var(--primary-text-inverted)",
                            opacity: hasMoveMade ? 1 : 0.6,
                        }}
                    />
                </S.ButtonRow>
            </S.ActionsContainer>
        </S.SidebarWrapper>
    );
};