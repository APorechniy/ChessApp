import { type RequestStatus } from "../../types/types";
import { type Student } from "../students/types";

export type StudentsAttended = {
    attendanceId: string;
    student: Student;
    attended: boolean;
}

export type StudentsAttendedState = {
    studentsAttended: StudentsAttended[],

    isLoadingStudentsAttended: RequestStatus
}