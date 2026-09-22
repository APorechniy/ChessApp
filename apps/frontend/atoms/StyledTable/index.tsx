import React from 'react'
import DataTable, { type TableProps } from 'react-data-table-component';

const getCustomStyles = (mainColor?: string, textColor?: string) => ({
    header: {
        style: {
            minHeight: '56px',
            fontSize: '1.6rem',
            fontWeight: '500',
            color: 'var(--primary-text-light)',
        },
    },
    headRow: {
        style: {
            minHeight: '52px',
            marginBottom: '1rem',
            backgroundColor: "var(--primary-block-background-light)",
            borderBottom: '0.1rem solid #F2F2F2',
        },
    },
    headCells: {
        style: {
            marginLeft: '0.2rem',
            marginRight: '0.2rem',
            fontSize: '1.4rem',
            paddingLeft: '0.4rem',
            fontWeight: '500',
            color: 'var(--primary-text-light)',
        },
    },
    cells: {
        style: {
            borderRadius: '0.8rem',
            backgroundColor: mainColor ? mainColor : '#eaeeff',
            padding: '1rem',
            marginLeft: '0.2rem',
            marginRight: '0.2rem',
            border: 'none',
            fontSize: '1.4rem',
            fontWeight: '500',
            color: textColor ? textColor : 'var(--secondary-text)',
            '&:hover': {
                backgroundColor: '#ecf0f1',
            },
        },
    },
    rows: {
        style: {
            minHeight: '4.8rem',
            marginTop: '0.2rem',
            backgroundColor: 'inherit',
            border: 'none !important',
            cursor: 'pointer',
        },
    },
});

export const StyledTable: React.FC<TableProps<any> & { mainColor?: string, textColor?: string }> = ({ mainColor, textColor, ...restProps }) => {
    const styles = getCustomStyles(mainColor, textColor)
    return (
        <DataTable
            responsive
            fixedHeader
            persistTableHead
            {...restProps}
            customStyles={styles}
        />
    )
}