import type { TableColumn } from "react-data-table-component";
import type { LearningTopics } from "../store/learning-topics/types";

export const COLUMNS: TableColumn<LearningTopics>[] = [
    {
        name: 'Название',
        selector: row => row.name,
    },
    {
        name: 'Описание',
        selector: row => row.description,
    },
    {
        name: 'Уровень подготовки',
        selector: row => row.level.name,
    }
]