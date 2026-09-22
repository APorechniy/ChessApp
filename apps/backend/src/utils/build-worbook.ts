import ExcelJS from "exceljs";

import { headerRow, headerCellStyle, reportsColumns, baseCellStyle } from "../content/reports-table-config";

type Row = {
  data: any;
  style?: ExcelJS.Style;
};

// const templateFileName = `${process.cwd()}/src/content/StudentReportPreset.xlsx`
// const templateWorksheetName = "Template"

export const buildWorkBook = async (
  rows: Row[],
  worksheetName: string,
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  if (!worksheet) {
    throw new Error("Cant get a worksheet")
  }

  // Инициализация шаблона
  worksheet.name = worksheetName
  worksheet.columns = [...reportsColumns]
  worksheet.addRow(headerRow.values)
  worksheet.getRow(1).eachCell((c) => c.style = headerCellStyle)

  rows.forEach((r, index) => {
    worksheet.addRow(r.data);
    worksheet.getRow(index + 2).eachCell((c) => c.style = baseCellStyle)
  });

  return workbook;
};
