import React, { FC } from "react";
import { useRouter } from "next/router";
import { type Homework } from "../../../store/homeworks/types";
import { useAppSelector } from "../../../store/store";
import * as S from "./styled";
import { getHumanityDate } from "../../../utils/get-humanity-date";

type Props = {
    homework: Homework;
}

export const HomeworkCard: FC<Props> = ({ homework }) => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const router = useRouter();
    const { id, name, expiresAt, tasks } = homework;

    const deadlineDate = new Date(expiresAt);
    const isExpired = deadlineDate.getTime() < Date.now();
    const formattedDate = getHumanityDate(expiresAt);

    const handleCardClick = () => {
        const link = currentUser?.role === "student" ? `/homeworks/preview/${id}` : `/homeworks/${id}`
        router.push(link);
    };

    return (
        <S.CardWrapper onClick={handleCardClick}>
            <div>
                <S.CardHeader>
                    <S.CardTitle>{name || `Задание #${id.slice(0, 6)}`}</S.CardTitle>
                    <S.TasksCountBadge>
                        {tasks?.length ?? 0} {tasks?.length === 1 ? "задача" : "задач"}
                    </S.TasksCountBadge>
                </S.CardHeader>
            </div>

            <S.CardFooter>
                <S.InfoItem>Дедлайн:</S.InfoItem>
                <S.DeadlineBadge $isExpired={isExpired}>
                    {formattedDate}
                </S.DeadlineBadge>
            </S.CardFooter>
        </S.CardWrapper>
    );
};