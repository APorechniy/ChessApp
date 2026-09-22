import type { RowDataPacket } from "mysql2";
import { type CoachView } from "../../entities/coach-view.entity";
import { type StudentView } from "../../entities/student-view.entity";

export type UserRole = "admin" | "coach" | "student" | "parent";

export type UserModel = {
  id: string;
  username: string;
  password: string;
  role: UserRole;
};

export type User = Omit<UserModel, "password">;

export interface UserView extends RowDataPacket {
  id: string;
  username: string;
  role: UserRole;
  userData?: CoachView | StudentView;
}

export type UserBase = {
  id: string,
  username: string,
}

export type CoachUser = UserBase & {
  role: "coach",
  userData: CoachView
}
export type StudentUser = UserBase & {
  role: "student",
  userData: StudentView
}
export type AdminUser = UserBase & {
  role: "admin",
  userData: null
}

export type UserViewResult = CoachUser | StudentUser | AdminUser