import React, { FC, useEffect } from "react";
import {
    HomeworkSolutionStatus
} from "../../store/homeworks/types";
import { TextButton } from "../../atoms/TextButton";
import { getHumanityDate } from "../../utils/get-humanity-date";
import * as S from "./styled";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCurrentSolution } from "../../store/homeworks/thunk/get-current-solution";
import { Loader } from "../../atoms/Loader";
import { handleClearCurrentSolution } from "../../store/homeworks";
import { useRouter } from "next/router";

interface SolutionStarterProps {
    homeworkId: string;
}

const STATUS_LABELS: Record<HomeworkSolutionStatus, string> = {
    [HomeworkSolutionStatus.New]: "Новое задание",
    [HomeworkSolutionStatus.InProgress]: "В процессе выполнения",
    [HomeworkSolutionStatus.Solved]: "Ожидает проверки",
    [HomeworkSolutionStatus.Checked]: "Проверено преподавателем",
};

export const SolutionStarter: FC<SolutionStarterProps> = ({ homeworkId }) => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const { currentSolution, isLoadingCurrentSolution } = useAppSelector(({ homeworks }) => homeworks)

    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if (currentUser && currentUser.role === "student" && homeworkId) {
            dispatch(getCurrentSolution({
                homeworkId: homeworkId,
                studentId: currentUser?.id
            }))
        }

        return () => {
            dispatch(handleClearCurrentSolution())
        }
    }, [currentUser, homeworkId, dispatch])

    const deadlineDate = currentSolution?.homework?.expiresAt
        ? getHumanityDate(currentSolution?.homework.expiresAt)
        : "Не указан";

    const onAction = () => {
        router.push(`/homeworks/train/${homeworkId}`)
    }

    const renderAction = () => {
        switch (currentSolution?.status) {
            case HomeworkSolutionStatus.New:
                return (
                    <TextButton
                        text="Начать"
                        onClick={onAction}
                        backgroundColor="var(--primary-btn-color)"
                        style={{
                            width: "100%",
                            padding: "1.6rem 2.4rem",
                            fontSize: "1.6rem",
                            borderRadius: "1.2rem",
                            fontWeight: 600,
                            color: "var(--primary-text-inverted)",
                        }}
                    />
                );

            case HomeworkSolutionStatus.InProgress:
                return (
                    <TextButton
                        text="Продолжить"
                        onClick={onAction}
                        backgroundColor="var(--primary-orange)"
                        style={{
                            width: "100%",
                            padding: "1.6rem 2.4rem",
                            fontSize: "1.6rem",
                            borderRadius: "1.2rem",
                            fontWeight: 600,
                            color: "var(--primary-text-inverted)",
                        }}
                    />
                );

            case HomeworkSolutionStatus.Solved:
                return <S.StatusMessage $variant="solved">Ждет проверки</S.StatusMessage>;

            case HomeworkSolutionStatus.Checked:
                return <S.StatusMessage $variant="checked">Решено</S.StatusMessage>;

            default:
                return null;
        }
    };

    return (
        <S.ScreenWrapper>
            {
                Boolean(isLoadingCurrentSolution === "SUCCESS" && currentSolution)
                    ?
                    <S.StarterCard>
                        <S.CardHeader>
                            <S.HeaderTop>
                                <S.StatusBadge $status={currentSolution.status}>
                                    {STATUS_LABELS[currentSolution.status]}
                                </S.StatusBadge>
                            </S.HeaderTop>
                            <S.Title>{currentSolution.homework?.name || `Задание #${currentSolution.homework?.id?.slice(0, 6)}`}</S.Title>
                        </S.CardHeader>

                        <S.InfoList>
                            <S.InfoRow>
                                <span>Количество задач:</span>
                                <strong>{currentSolution?.homework.tasks.length}</strong>
                            </S.InfoRow>
                            <S.InfoRow>
                                <span>Дедлайн сдачи:</span>
                                <strong>{deadlineDate}</strong>
                            </S.InfoRow>
                        </S.InfoList>

                        <S.ActionsContainer>
                            {renderAction()}
                        </S.ActionsContainer>
                    </S.StarterCard>
                    :
                    <Loader />
            }
        </S.ScreenWrapper>
    );
};