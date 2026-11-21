import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getHomeworkSolutions } from "../../store/homeworks/thunk/get-homework-solutions";
import { handleClearSolutionsList } from "../../store/homeworks/";
import { Loader } from "../../atoms/Loader";
import { SolutionCard } from "./SolutionCard";
import * as S from "./styled";

export const SolutionsList: FC = () => {
    const router = useRouter();
    const { homeworkId } = router.query;
    const dispatch = useAppDispatch();

    const { homeworkSolutionsList, isLoadingHomeworkSolutions } = useAppSelector(
        ({ homeworks }) => homeworks
    );

    useEffect(() => {
        if (homeworkId && typeof homeworkId === "string") {
            dispatch(getHomeworkSolutions({ homeworkId: homeworkId }));
        }

        return () => {
            dispatch(handleClearSolutionsList());
        };
    }, [dispatch, homeworkId]);

    if (isLoadingHomeworkSolutions === "PENDING") {
        return (
            <S.Container>
                <S.StateFeedback>Загрузка решений...</S.StateFeedback>
                <Loader />
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>Решения домашнего задания</S.Title>
            </S.Header>

            {!homeworkSolutionsList || homeworkSolutionsList.length === 0 ? (
                <S.StateFeedback>Решений пока нет</S.StateFeedback>
            ) : (
                <S.SolutionsGrid>
                    {homeworkSolutionsList.map((solution) => (
                        <SolutionCard key={solution.id} solution={solution} />
                    ))}
                </S.SolutionsGrid>
            )}
        </S.Container>
    );
};