import type { RequestStatus } from "../../types/types"
import { type Task } from "../tasks/types"
import { type Student } from '../students/types'

export enum HomeworkSolutionStatus {
    New = 'new',
    InProgress = 'in_progress',
    Solved = 'solved',
    Checked = 'checked',
}

export enum SolutionAnswerStatus {
    NotSolved = 'not_solved',
    Check = 'check',
    Error = 'error',
    Almost = 'almost',
    Success = 'success',
}

export type Homework = {
    id: string,
    name?: string,
    attendanceId: string,
    expiresAt: string,
    tasks: Task[]
}

export type HomeworkTask = {
    id: string,
    orderIndex: number,
    homeworkId: string,
    task: Task
}

export type HomeworkSolution = {
    id: string,
    student: Student,
    homework: Homework,
    status: HomeworkSolutionStatus,
    startedAt: string,
    finishedAt: string | null,
}

export type SolutionAnswer = {
    id: string,
    homeworkId: string,
    homeworkSolutionId: string,
    homeworkTaskId: string,
    answerText?: string,
    startedAt?: string,
    submittedAt?: string,
    checkedAt?: string,
    status: SolutionAnswerStatus,
    coachComment?: string,
}

// TODO - привести к одному виду 
export type SolutionAnswerView = {
    id: string,
    homeworkId: string,
    homeworkSolutionId: string,
    homeworkTask: HomeworkTask,
    answerText?: string,
    startedAt?: string,
    submittedAt?: string,
    checkedAt?: string,
    status: SolutionAnswerStatus,
    coachComment?: string,
}

export type SolutionAnswerWithoutId = Omit<SolutionAnswer, "id">

export type HomeworkWithoutId = Omit<Homework, "id">

export type HomeworksState = {
    homeworksList: Homework[],
    homeworkSolutionsList: HomeworkSolution[],
    currentHomework: Homework | null,
    currentSolution: HomeworkSolution | null,
    currentHomeworkTasks: HomeworkTask[],
    studentAnswers: SolutionAnswerView[],

    isLoadingHomeworkSolutions: RequestStatus,
    isLoadingHomeworksList: RequestStatus,
    isLoadingCurrentSolution: RequestStatus,
    isLoadingHomeworkTasks: RequestStatus,
    isLoadingStudentAnswers: RequestStatus,
    isLoadingHomework: RequestStatus,
    isCreatedSolutionAnswer: RequestStatus,
    isCreatedHomework: RequestStatus,
    isFreezedHomework: RequestStatus,
    isUpdatedHomework: RequestStatus,
    isUpdatedHomeworkSolution: RequestStatus,
    isUpdatedSolutionAnswer: RequestStatus,
    isDeletedHomework: RequestStatus,
}