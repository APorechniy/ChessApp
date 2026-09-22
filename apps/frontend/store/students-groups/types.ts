import type { Student } from "../students/types";
import type { RequestStatus } from "../../types/types";

export type StudentsGroupWithoutId = Omit<StudentsGroup, "id">

export type StudentsGroup = {
    id: string;
    name: string;
    description?: string;
    color?: string;
    students: Student[];
};

export type StudentsGroupsState = {
    studentsGroups: StudentsGroup[],

    selectedStudentsGroup: StudentsGroup | null,

    isLoadingStudentsGroups: RequestStatus,
    isCreatedStudentsGroup: RequestStatus,
    isUpdatedStudentsGroup: RequestStatus,
    isDeletedStudentsGroup: RequestStatus,
}