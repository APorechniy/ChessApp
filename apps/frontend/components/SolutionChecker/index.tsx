import React, { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Loader } from "../../atoms/Loader";
import { Board } from "./Board";
import { Sidebar } from "./Sidebar";
import * as S from "./styled";
import { HomeworkSolution, HomeworkSolutionStatus, SolutionAnswerStatus, SolutionAnswerView } from "../../store/homeworks/types";
import { updateHomeworkSolution } from "../../store/homeworks/thunk/update-homework-solution";
import { getStudentAnswers } from "../../store/homeworks/thunk/get-student-answers";
import { updateSolutionAnswer } from "../../store/homeworks/thunk/update-solution-answer";

export const SolutionChecker: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { studentAnswers, currentSolution, isLoadingStudentAnswers } = useAppSelector(
        ({ homeworks }) => homeworks
    );

    const solvedTaskIds: string[] = ["task-1"];

    const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

    const defaultStepIndex = useMemo(() => {
        if (!studentAnswers?.length || isLoadingStudentAnswers !== "SUCCESS") return 0;
        const firstUnsolvedIdx = studentAnswers.findIndex(
            (answer) => !solvedTaskIds.includes(answer.homeworkTask.id)
        );
        return firstUnsolvedIdx !== -1 ? firstUnsolvedIdx : 0;
    }, [studentAnswers, isLoadingStudentAnswers]);

    const currentStepIndex = selectedStepIndex ?? defaultStepIndex;
    const moves = studentAnswers?.[currentStepIndex]?.answerText ?? '';

    useEffect(() => {
        if (currentSolution && currentSolution.homework.id) {
            dispatch(getStudentAnswers({ homeworkId: currentSolution.homework.id, solutionId: currentSolution.id }));
        }
    }, [dispatch, currentSolution]);

    const currentTask = studentAnswers?.[currentStepIndex]?.homeworkTask.task;
    const initialFen = currentTask?.position || "";
    const isLastTask = currentStepIndex === studentAnswers.length - 1;

    const handleSelectStep = (index: number) => {
        setSelectedStepIndex(index);
    };

    const handleNext = async (newStatus: SolutionAnswerStatus) => {
        if (!currentTask || !currentSolution) return;

        const solutionAnswer: SolutionAnswerView = {
            ...studentAnswers[currentStepIndex],
            status: newStatus,
        }

        await dispatch(updateSolutionAnswer({
            solutionAnswer: solutionAnswer
        }))

        if (isLastTask) {
            const homeworkSolution: HomeworkSolution = {
                ...currentSolution,
                status: HomeworkSolutionStatus.Checked,
                finishedAt: new Date().toUTCString(),
            }

            await dispatch(updateHomeworkSolution({
                homeworkSolution: homeworkSolution
            }))

            router.push(`/homeworks/${currentSolution.homework.id}`);
            return;
        }

        handleSelectStep(currentStepIndex + 1);
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            handleSelectStep(currentStepIndex - 1);
        }
    };

    if (isLoadingStudentAnswers === "PENDING") {
        return (
            <S.Container>
                <S.StateFeedback>
                    <Loader />
                </S.StateFeedback>
            </S.Container>
        );
    }

    if (!studentAnswers || studentAnswers.length === 0) {
        return (
            <S.Container>
                <S.StateFeedback>Нет доступных решений задач</S.StateFeedback>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.StepperHeader>
                {studentAnswers.map((answer, index: number) => {
                    const isSolved = solvedTaskIds.includes(answer.homeworkTask.task.id);
                    const isActive = index === currentStepIndex;

                    return (
                        <S.StepItem
                            key={answer.id}
                            $isActive={isActive}
                            $isSolved={isSolved}
                            onClick={() => handleSelectStep(index)}
                        >
                            {index + 1}
                        </S.StepItem>
                    );
                })}
            </S.StepperHeader>

            <S.MainGrid>
                <Board
                    initialFen={initialFen}
                />

                <Sidebar
                    taskName={currentTask?.name || `Задача #${currentStepIndex + 1}`}
                    moves={moves}
                    onPrev={handlePrev}
                    handleNext={handleNext}
                    canGoBack={currentStepIndex > 0}
                />
            </S.MainGrid>
        </S.Container>
    );
};
