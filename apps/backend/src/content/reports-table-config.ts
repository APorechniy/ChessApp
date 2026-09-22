import type { Column, Cell, Font, Alignment, Borders, Fill, Row } from "exceljs";

const headerRowFont: Partial<Font> = {
    bold: true,
    size: 12,
    color: { theme: 1 },
    name: 'Calibri',
    family: 2,
    charset: 204,
    scheme: 'minor'
}

const headerAlignment: Partial<Alignment> = { horizontal: 'center', vertical: 'middle', wrapText: true }

const headerBorder: Partial<Borders> = { bottom: { style: 'thin', color: { argb: "FF000000" } } }

const headerFill: Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFc4d79b" } }

export const headerCellStyle = {
    font: headerRowFont,
    alignment: headerAlignment,
    border: headerBorder,
    fill: headerFill
}

export const baseCellStyle = {
    alignment: headerAlignment
}

export const reportsColumns: Partial<Column>[] = [
    { key: "attendance_date", width: 11.5546875 },
    { key: "coach_name", width: 17.88671875 },
    { key: "learning_topic", width: 17.6640625 },
    { key: "type", width: 15.77734375 },
    { key: "attendance_main_tasks", width: 25 },
    {
        key: "attendance_additional_tasks",
        width: 28.88671875
    },
    { key: "chess_games", width: 17.77734375 },
    { key: "chess_opening", width: 18 },
    { key: "homework_done", width: 27.77734375 },
    { key: "attended", width: 14 },
    { key: "is_paid", width: 8.77734375 },
]


const headerRowsCells: Partial<Cell>[] = [
    { value: "Дата", name: "attendance_date", style: headerCellStyle },
    { value: "Тренер", name: "coach_name", style: headerCellStyle },
    { value: "Тема занятия", name: "learning_topic", style: headerCellStyle },
    { value: "Тип занятия", name: "type", style: headerCellStyle },
    { value: "Задачи по теме", name: "attendance_main_tasks", style: headerCellStyle },
    {
        value: "Задачи дополнительные",
        name: "attendance_additional_tasks",
        style: headerCellStyle
    },
    { value: "Разбор партий", name: "chess_games", style: headerCellStyle },
    { value: "Дебют", name: "chess_opening", style: headerCellStyle },
    { value: "Домашнее задание", name: "homework_done", style: headerCellStyle },
    { value: "Посещение", name: "attended", style: headerCellStyle },
    { value: "Оплата", name: "is_paid", style: headerCellStyle },
];

export const headerRow: Partial<Row> = {
    values: headerRowsCells.map(hrc => hrc.value),
}