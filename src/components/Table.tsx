import { FiMoreVertical } from "@react-icons/all-files/fi/FiMoreVertical";
import { Dropdown } from "flowbite-react";
import React, { useEffect } from "react";
import { When } from "react-if";
import {
    Row,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Pagination from "./Pagination";

type TableProps = {
    columns: { Header: string; accessor: string }[];
    data?: Record<string, unknown>[];
    actions?: TableActions;
    search?: string;
};

export type TableActions = (row: Row<Record<string, unknown>>) => {
    text: string;
    onClick: (row: Row<Record<string, unknown>>) => void;
}[];

const Table: React.FC<TableProps> = ({
    columns = [],
    data = [],
    actions,
    search,
}) => {
    const tableInstance = useTable(
        { columns: columns as any, data },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    const {
        page,
        previousPage,
        nextPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        setPageSize,
        state,
        setGlobalFilter,
    } = tableInstance as any;

    useEffect(() => {
        setGlobalFilter(search);
    }, [search]);

    useEffect(() => {
        setPageSize(15);
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full min-h-[15rem]">
                <table
                    {...getTableProps()}
                    className="w-full text-sm text-left text-text"
                >
                    <thead className="text-xs text-text-light uppercase bg-background-light sticky top-0">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="px-6 py-3"
                                    >
                                        <div className="flex items-center">
                                            {column.render("Header")}
                                        </div>
                                    </th>
                                ))}
                                <When condition={!!actions}>
                                    <th className="px-6 py-3"></th>
                                </When>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row: Row<Record<string, unknown>>) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="bg-transparent border-b border-background-light"
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-6 py-4 font-medium text-text whitespace-nowrap"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                    <When condition={!!actions}>
                                        <td>
                                            <Dropdown
                                                label={<FiMoreVertical />}
                                                arrowIcon={false}
                                                inline
                                                className="tooltip"
                                            >
                                                {actions &&
                                                    actions(row).map(
                                                        (action) => (
                                                            <Dropdown.Item
                                                                key={
                                                                    action.text
                                                                }
                                                                onClick={() =>
                                                                    action.onClick(
                                                                        row
                                                                    )
                                                                }
                                                            >
                                                                {action.text}
                                                            </Dropdown.Item>
                                                        )
                                                    )}
                                            </Dropdown>
                                        </td>
                                    </When>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                pageCount={pageCount}
                pageIndex={state?.pageIndex}
            />
        </>
    );
};

export default Table;
