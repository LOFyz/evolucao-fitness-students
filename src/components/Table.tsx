import { FiMoreVertical } from "@react-icons/all-files/fi/FiMoreVertical";
import { Dropdown } from "flowbite-react";
import React from "react";
import { When } from "react-if";
import { Row, useTable } from "react-table";

type TableProps = {
    columns: { Header: string; accessor: string }[];
    data?: Record<string, unknown>[];
    actions?: (row: Row<Record<string, unknown>>) => {
        text: string;
        onClick: (row: Row<Record<string, unknown>>) => void;
    }[];
};

const Table: React.FC<TableProps> = ({ columns = [], data = [], actions }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns: columns as any, data });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
                {...getTableProps()}
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                                        >
                                            {actions &&
                                                actions(row).map((action) => (
                                                    <Dropdown.Item
                                                        key={action.text}
                                                        onClick={() =>
                                                            action.onClick(row)
                                                        }
                                                    >
                                                        {action.text}
                                                    </Dropdown.Item>
                                                ))}
                                        </Dropdown>
                                    </td>
                                </When>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
