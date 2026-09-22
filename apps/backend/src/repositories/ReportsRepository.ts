// import type { Pool } from "mysql2/typings/mysql/lib/Pool";
// import type { ReportModelResult, Report } from "../types/Reports";

// export class ReportsRepository {
//   pool: Pool | null;

//   constructor(dbPool: Pool) {
//     this.pool = dbPool;
//   }

//   async getReportsByStudentsId(studentId: string) {
//     const rows = await this.pool
//       ?.promise()
//       .query<
//         ReportModelResult[]
//       >(`SELECT * FROM reports WHERE student_id='${studentId}';`);

//     if (!rows || !rows[0] || rows[0].length === 0) {
//       return [];
//     }

//     const reportsList: Report[] = rows[0].map(
//       ({ id, student_id, created_date, content }) => {
//         return {
//           id: id,
//           studentId: student_id,
//           createdDate: created_date,
//           content: content,
//         };
//       },
//     );

//     return reportsList;
//   }
// }
