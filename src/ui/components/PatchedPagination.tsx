import { TablePagination, TablePaginationProps } from '@material-ui/core';
import React, { FC } from 'react';


const PatchedPagination: FC<TablePaginationProps> = (props: TablePaginationProps) => {
    const {
        ActionsComponent,
        onChangePage,
        onChangeRowsPerPage,
        ...tablePaginationProps
    } = props;

    return (
        <TablePagination
            {...tablePaginationProps}
            // @ts-expect-error onChangePage was renamed to onPageChange
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    // @ts-expect-error ActionsComponent is provided by material-table
                    <ActionsComponent
                        {...actionsComponentProps}
                        onChangePage={onPageChange}
                    />
                );
            }}
        />
    );
};

export default PatchedPagination;