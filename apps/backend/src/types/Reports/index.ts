import type { RowDataPacket } from "mysql2";

export type ReportModel = {
  id: string;
  student_id: string;
  created_date: string;
  content: string;
};

export type Report = {
  id: string;
  studentId: string;
  createdDate: string;
  content: string;
};

export type ReportModelResult = ReportModel & RowDataPacket;
