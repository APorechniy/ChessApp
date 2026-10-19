import React, { useMemo, useState } from 'react';
import {
    useTable,
    type ColumnDef,
    type Row,
    type ExpandedState,
    RowData,
} from '@tanstack/react-table';
import { appTableFeatures, type AppTableFeatures } from './Features/features';
import * as S from './styled';
import { TextButton } from 'atoms/TextButton';

export interface StyledTableProps<TData extends RowData> {
    readonly data: readonly TData[];
    readonly columns: readonly ColumnDef<AppTableFeatures, TData, unknown>[];
    readonly getRowId?: (row: TData, index: number) => string;
    readonly mainColor?: string;
    readonly textColor?: string;
    readonly theme?: 'light' | 'dark';
    readonly isNested?: boolean;
    // Выпадающие строки (v9 Expanding Guide)
    readonly expandableRows?: boolean;
    readonly expandableRowsComponent?: React.ComponentType<{
        readonly data: TData;
        readonly row: Row<AppTableFeatures, TData>;
    }>;
    readonly lastRowConfig?: {
        readonly buttonText: string;
        readonly buttonHandler: () => void;
    };
    readonly onRowExpandToggled?: (expanded: boolean, row: TData) => void;
    // Клик по всей строке карточки
    readonly onRowClicked?: (row: TData) => void;
}

export function StyledTable<TData extends RowData>({
    data,
    columns,
    getRowId,
    mainColor,
    textColor,
    expandableRows = false,
    expandableRowsComponent: ExpandableComponent,
    lastRowConfig = undefined,
    isNested,
    onRowExpandToggled,
    onRowClicked,
}: StyledTableProps<TData>): React.ReactElement {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Автоматическая генерация колонки-шеврона при expandableRows === true
    const tableColumns = useMemo<ColumnDef<AppTableFeatures, TData, unknown>[]>(() => {
        if (!expandableRows) {
            return columns as ColumnDef<AppTableFeatures, TData, unknown>[];
        }

        const expanderColumn: ColumnDef<AppTableFeatures, TData, unknown> = {
            id: '__expander',
            header: () => null,
            cell: ({ row }) => {
                if (!row.getCanExpand()) {
                    return null;
                }

                return (
                    <S.ExpanderButton
                        type="button"
                        aria-label="Раскрыть строку"
                        aria-expanded={row.getIsExpanded()}
                        $isExpanded={row.getIsExpanded()}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation(); // Изоляция от клика строки
                            const willExpand = !row.getIsExpanded();
                            row.toggleExpanded();
                            onRowExpandToggled?.(willExpand, row.original);
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </S.ExpanderButton>
                );
            },
        };

        return [expanderColumn, ...columns];
    }, [columns, expandableRows, onRowExpandToggled]);

    // Инициализация экземпляра таблицы v9
    const table = useTable({
        features: appTableFeatures,
        data: data as TData[],
        columns: tableColumns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getRowCanExpand: () => expandableRows,
        getRowId,
    });

    return (
        <S.TableContainer $isNested={isNested}>
            <S.TableElement role="table">
                <thead role="rowgroup">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} role="row">
                            {headerGroup.headers.map((header) => (
                                <S.Th
                                    key={header.id}
                                    role="columnheader"
                                >
                                    {header.isPlaceholder ? null : (
                                        <table.FlexRender header={header} />
                                    )}
                                </S.Th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody role="rowgroup">
                    {table.getRowModel().rows.map((row) => {
                        const isExpanded = row.getIsExpanded();

                        return (
                            <React.Fragment key={row.id}>
                                <S.Tr
                                    role="row"
                                    $isClickable={Boolean(onRowClicked)}
                                    $isExpanded={isExpanded}
                                    onClick={() => onRowClicked?.(row.original)}
                                >
                                    {row.getAllCells().map((cell) => (
                                        <S.Td
                                            key={cell.id}
                                            role="cell"
                                            $mainColor={mainColor}
                                            $textColor={textColor}
                                            $isExpanded={isExpanded}
                                        >
                                            <table.FlexRender cell={cell} />
                                        </S.Td>
                                    ))}
                                </S.Tr>
                                {/* Рендер выпадающей панели по официальному гайду v9 */}
                                {isExpanded && ExpandableComponent && (
                                    <S.ExpandedRow role="row">
                                        <S.ExpandedCell
                                            colSpan={row.getAllCells().length}
                                            role="cell"
                                        >
                                            <S.ExpandedContentWrapper>
                                                <ExpandableComponent
                                                    data={row.original}
                                                    row={row}
                                                />
                                            </S.ExpandedContentWrapper>
                                        </S.ExpandedCell>
                                    </S.ExpandedRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {lastRowConfig && (
                        <S.Tr
                            role="row"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}
                        >
                            <S.Td
                                role="cell"
                                colSpan={table.getAllColumns().length}
                                $mainColor={mainColor}
                                $textColor={textColor}
                            >
                                <TextButton
                                    onClick={lastRowConfig.buttonHandler}
                                    text={lastRowConfig.buttonText}
                                    style={{
                                        width: "auto",
                                        padding: "1rem"
                                    }}
                                />
                            </S.Td>
                        </S.Tr>
                    )}
                </tbody>
            </S.TableElement>
        </S.TableContainer>
    );
}