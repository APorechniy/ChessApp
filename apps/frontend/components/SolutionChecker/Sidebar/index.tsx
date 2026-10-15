import React, { FC } from "react";
import * as S from "./styled";
import { TextButton } from '../../../atoms/TextButton'
import { SolutionAnswerStatus } from "../../../store/homeworks/types";

interface SidebarProps {
    taskName: string;
    moves: string;
    onPrev: () => void;
    handleNext: (newStatus: SolutionAnswerStatus) => void;
    canGoBack: boolean;
}

export const Sidebar: FC<SidebarProps> = ({
    taskName,
    moves,
    onPrev,
    handleNext,
    canGoBack,
}) => {
    return (
        <S.SidebarWrapper>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                <S.TaskMeta>
                    <S.TaskTitle>{taskName}</S.TaskTitle>
                </S.TaskMeta>

                <S.NotationBlock>
                    <S.NotationLabel>Нотация решения:</S.NotationLabel>
                    <S.MovesContainer>{moves}</S.MovesContainer>
                </S.NotationBlock>
            </div>

            <S.ActionsContainer>
                <S.ButtonRow>
                    <TextButton
                        text="Верно"
                        onClick={() => handleNext(SolutionAnswerStatus.Success)}
                        backgroundColor="var(--secondary-background)"
                        style={{
                            flex: 1,
                            padding: "1.4rem",
                            borderRadius: "1rem",
                            fontSize: "1.4rem",
                            color: "var(--primary-text-inverted)",
                        }}
                    />
                </S.ButtonRow>
                <S.ButtonRow>
                    <TextButton
                        text="Ошибка"
                        onClick={() => handleNext(SolutionAnswerStatus.Error)}
                        backgroundColor="var(--error-color)"
                        style={{
                            flex: 1,
                            padding: "1.4rem",
                            borderRadius: "1rem",
                            fontSize: "1.4rem",
                            color: "var(--primary-text-inverted)",
                        }}
                    />
                </S.ButtonRow>
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
                </S.ButtonRow>
            </S.ActionsContainer>
        </S.SidebarWrapper>
    );
};