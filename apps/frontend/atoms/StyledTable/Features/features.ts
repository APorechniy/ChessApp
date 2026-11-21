import {
    tableFeatures,
    rowExpandingFeature,
    createExpandedRowModel,
    createColumnHelper,
    type RowData,
} from '@tanstack/react-table';

// 1. Стабильный объект фич приложения (включает ядро + выпадающие строки)
export const appTableFeatures = tableFeatures({
    rowExpandingFeature,
    expandedRowModel: createExpandedRowModel(),
});

// 2. Тип зарегистрированных фич для передачи в дженерики v9
export type AppTableFeatures = typeof appTableFeatures;

// 3. Фабрика хелпера колонок, уже привязанная к фичам приложения
export function createAppColumnHelper<T extends RowData>() {
    return createColumnHelper<AppTableFeatures, T>();
}