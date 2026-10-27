import React, { FC, useEffect, Fragment } from "react";
import { getHomeworksList } from "../../store/homeworks/thunk/get-homeworks-list";
import { HomeworkCard } from "./HomeworkCard";
import * as S from "./styled";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Loader } from "../../atoms/Loader";
import { useGroupedHomeworks } from "../../hooks/use-grouped-homeworks";
import { getHomeworksByStudentId } from "../../store/homeworks/thunk/get-homeworks-by-student-id";
import { TextButton } from "atoms/TextButton";
import { handleOpenModal } from "store/system";

export const HomeworkList: FC = () => {
    const dispatch = useAppDispatch();

    const { homeworksList, isLoadingHomeworksList } = useAppSelector(
        ({ homeworks }) => homeworks
    );

    const { currentUser } = useAppSelector(({ users }) => users)

    const groupedHomeworks = useGroupedHomeworks(homeworksList);

    useEffect(() => {
        if (currentUser?.role === "student") {
            dispatch(getHomeworksByStudentId({ studentId: currentUser.id }))
        } else {
            dispatch(getHomeworksList());
        }
    }, [dispatch, currentUser]);

    if (isLoadingHomeworksList === "PENDING") {
        return (
            <S.DashboardContainer>
                <S.StateFeedback>Загрузка домашних заданий...</S.StateFeedback>
                <Loader />
            </S.DashboardContainer>
        );
    }

    const groups = Object.entries(groupedHomeworks);

    const handleAddHomework = () => {
        dispatch(handleOpenModal({
            modalContent: "CREATE_HOMEWORK"
        }))
    };

    return (
        <S.DashboardContainer>
            <S.DashboardHeader>
                <S.Title>Домашние задания</S.Title>
                <TextButton onClick={handleAddHomework} text="Добавить занятие" style={{ width: "auto", boxSizing: "border-box", padding: "1rem" }} />
            </S.DashboardHeader>

            {groups.length === 0 ? (
                <S.StateFeedback>Список заданий пуст</S.StateFeedback>
            ) : (
                <S.SectionsContainer>
                    {groups.map(([sectionTitle, items], index) => (
                        <Fragment key={sectionTitle}>
                            {index > 0 && <S.Divider />}
                            <S.Section>
                                <S.SectionTitle $isExpired={sectionTitle === "Просроченные"}>
                                    {sectionTitle}
                                </S.SectionTitle>
                                <S.HomeworkGrid>
                                    {items.map((homework) => (
                                        <HomeworkCard key={homework.id} homework={homework} />
                                    ))}
                                </S.HomeworkGrid>
                            </S.Section>
                        </Fragment>
                    ))}
                </S.SectionsContainer>
            )}
        </S.DashboardContainer>
    );
};