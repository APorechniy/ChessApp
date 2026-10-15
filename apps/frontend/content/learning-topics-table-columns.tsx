import { createAppColumnHelper } from '../atoms/StyledTable/Features/features';
import type { LearningTopics } from '../store/learning-topics/types';

const columnHelper = createAppColumnHelper<LearningTopics>();

export const COLUMNS = columnHelper.columns([
    columnHelper.accessor('name', {
        header: 'Название',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
        header: 'Описание',
        cell: (info) => info.getValue() ?? '—',
    }),
    columnHelper.accessor((row) => row.level?.name, {
        id: 'levelName',
        header: 'Уровень подготовки',
        cell: (info) => info.getValue() ?? '—',
    }),
]);