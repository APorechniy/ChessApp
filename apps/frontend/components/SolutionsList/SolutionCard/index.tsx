import React, { FC } from "react";
import {
    type HomeworkSolution,
    HomeworkSolutionStatus
} from "../../../store/homeworks/types";
import { getHumanityDate } from "../../../utils/get-humanity-date";
import * as S from "./styled";

interface SolutionCardProps {
    solution: HomeworkSolution;
}

const STATUS_LABELS: Record<HomeworkSolutionStatus, string> = {
    [HomeworkSolutionStatus.New]: "Новое",
    [HomeworkSolutionStatus.InProgress]: "В процессе",
    [HomeworkSolutionStatus.Solved]: "Решено",
    [HomeworkSolutionStatus.Checked]: "Проверено",
};

export const SolutionCard: FC<SolutionCardProps> = ({ solution }) => {
    const { student, status, startedAt, finishedAt } = solution;

    const studentFullName = student
        ? `${student.lastName} ${student.firstName}`
        : "Неизвестный ученик";

    return (
        <S.CardWrapper>
            <S.CardHeader>
                <S.StudentName>{studentFullName}</S.StudentName>
                <S.StatusBadge $status={status}>
                    {STATUS_LABELS[status] || status}
                </S.StatusBadge>
            </S.CardHeader>

            <S.DatesContainer>
                <S.DateItem>
                    Начато:
                    <span>{startedAt ? getHumanityDate(startedAt) : "—"}</span>
                </S.DateItem>
                <S.DateItem>
                    Завершено:
                    <span>{finishedAt ? getHumanityDate(finishedAt) : "—"}</span>
                </S.DateItem>
            </S.DatesContainer>
        </S.CardWrapper>
    );
};