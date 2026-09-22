import { type Student } from "../types";
import { api } from "../../../axios";

export type GetAllStudentsParams = {
  username: string,
  password: string
}

type Response = {
  studentsList: Student[];
};

type GetAllStudents = () => Promise<Response>;

const getAllStudents: GetAllStudents = async () => {
  const response = await api.get(`/students/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export default getAllStudents;
