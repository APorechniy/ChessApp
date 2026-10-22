import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Loader } from "../../atoms/Loader";
import { SolverBoard } from "./components/SolverBoard";
import { SolverSidebar } from "./components/SolverSidebar";
import { getHomeworkTasks } from "../../store/homeworks/thunk/get-homework-tasks";
import * as S from "./styled";
import { createSolutionAnswer } from "../../store/homeworks/thunk/create-solution-answer";
import { HomeworkSolution, HomeworkSolutionStatus, SolutionAnswer, SolutionAnswerStatus, SolutionAnswerWithoutId } from "../../store/homeworks/types";
import { getCurrentSolution } from "../../store/homeworks/thunk/get-current-solution";
import { updateHomeworkSolution } from "../../store/homeworks/thunk/update-homework-solution";

export const HomeworkSolver: FC = () => {
    const router = useRouter();
    const { homeworkId } = router.query;
    const dispatch = useAppDispatch();

    const { currentUser } = useAppSelector(({ users }) => users)
    const { currentHomeworkTasks, currentSolution, isLoadingHomeworkTasks, isLoadingCurrentSolution } = useAppSelector(
        ({ homeworks }) => homeworks
    );

    const solvedTaskIds: string[] = ["task-1"];

    const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
    const [editedFen, setEditedFen] = useState<string | null>(null);
    const [moves, setMoves] = useState<string[]>([]);
    const [resetSignal, setResetSignal] = useState<number>(0);

    const defaultStepIndex = (() => {
        if (!currentHomeworkTasks?.length) return 0;
        const firstUnsolvedIdx = currentHomeworkTasks.findIndex(
            (task) => !solvedTaskIds.includes(task.id)
        );
        return firstUnsolvedIdx !== -1 ? firstUnsolvedIdx : 0;
    })();

    const currentStepIndex = selectedStepIndex ?? defaultStepIndex;

    useEffect(() => {
        if (homeworkId && typeof homeworkId === "string") {
            dispatch(getHomeworkTasks({ homeworkId }));
        }
    }, [dispatch, homeworkId]);

    useEffect(() => {
        if (isLoadingCurrentSolution !== "SUCCESS" || !currentSolution) {
            if (homeworkId && typeof homeworkId === "string" && currentUser) {
                dispatch(getCurrentSolution({
                    homeworkId: homeworkId as string,
                    studentId: currentUser.id
                }))
            }
        }
    }, [dispatch, currentSolution, isLoadingCurrentSolution])

    const currentTask = currentHomeworkTasks?.[currentStepIndex];
    const initialFen = currentTask?.task.position || "";
    const initialStartsWhite = initialFen.includes(" w ");
    const currentFen = editedFen ?? initialFen;
    const isCurrentWhiteTurn = currentFen
        ? currentFen.includes(" w ")
        : initialStartsWhite;

    const isLastTask = currentStepIndex === currentHomeworkTasks.length - 1;
    const hasMoveMade = moves.length > 0;

    const handleSelectStep = (index: number) => {
        setSelectedStepIndex(index);
        setEditedFen(null);
        setMoves([]);
    };

    const handlePositionChange = (newFen: string, updatedMoves: string[]) => {
        setEditedFen(newFen);
        setMoves(updatedMoves);
    };

    const handleResetMove = () => {
        setEditedFen(null);
        setMoves([]);
        setResetSignal((prev) => prev + 1);
    };

    const handleNext = async () => {
        if (!currentTask || !currentSolution) return;

        const solutionAnswer: SolutionAnswerWithoutId = {
            homeworkId: homeworkId as string,
            homeworkSolutionId: currentSolution.id,
            homeworkTaskId: currentTask.id,
            answerText: moves.join(" "),
            // TODO добавить трэк
            startedAt: new Date().toUTCString(),
            submittedAt: new Date().toUTCString(),
            status: SolutionAnswerStatus.Check,
        }

        await dispatch(createSolutionAnswer({
            solutionAnswer: solutionAnswer
        }))

        if (isLastTask) {
            const homeworkSolution: HomeworkSolution = {
                ...currentSolution,
                status: HomeworkSolutionStatus.Solved,
                finishedAt: new Date().toUTCString(),
            }

            await dispatch(updateHomeworkSolution({
                homeworkSolution: homeworkSolution
            }))

            router.push(`/homeworks/${homeworkId}`);
            return;
        }

        handleSelectStep(currentStepIndex + 1);
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            handleSelectStep(currentStepIndex - 1);
        }
    };

    if (isLoadingHomeworkTasks === "PENDING") {
        return (
            <S.SolverContainer>
                <S.StateFeedback>
                    <Loader />
                </S.StateFeedback>
            </S.SolverContainer>
        );
    }

    if (!currentHomeworkTasks || currentHomeworkTasks.length === 0) {
        return (
            <S.SolverContainer>
                <S.StateFeedback>В данном домашнем задании нет задач</S.StateFeedback>
            </S.SolverContainer>
        );
    }

    return (
        <S.SolverContainer>
            <S.StepperHeader>
                {currentHomeworkTasks.map((task, index: number) => {
                    const isSolved = solvedTaskIds.includes(task.id);
                    const isActive = index === currentStepIndex;

                    return (
                        <S.StepItem
                            key={task.id}
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
                <SolverBoard
                    key={`${currentStepIndex}-${resetSignal}`}
                    initialFen={initialFen}
                    onPositionChange={handlePositionChange}
                    resetSignal={resetSignal}
                />

                <SolverSidebar
                    taskName={currentTask?.task.name || `Задача #${currentStepIndex + 1}`}
                    isWhiteTurn={isCurrentWhiteTurn}
                    moves={moves}
                    initialStartsWhite={initialStartsWhite}
                    isLastTask={isLastTask}
                    hasMoveMade={hasMoveMade}
                    onResetMove={handleResetMove}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    canGoBack={currentStepIndex > 0}
                />
            </S.MainGrid>
        </S.SolverContainer>
    );
};

export default HomeworkSolver;