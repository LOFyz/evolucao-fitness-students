import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import { PageProps } from "gatsby";
import React from "react";
import { When } from "react-if";
import GlobalLayout from "./Global";

type TableLayoutProps = {
    children: React.ReactNode;
    pageProps: PageProps;
    showAdd?: boolean;
    showSearch?: boolean;
    showOrderBy?: boolean;
    showFilter?: boolean;
    title?: string;
    addTitle?: string;
    onClickAdd?: () => void;
    onChangeSearch?: React.ChangeEventHandler<HTMLInputElement>;
    onChangeOrderBy?: React.ChangeEventHandler<HTMLSelectElement>;
    onChangeFilter?: React.ChangeEventHandler<HTMLSelectElement>;
};

const orderByOptions = {
    ascending: "A-Z",
    descending: "Z-A",
    newer: "Mais recentes",
    older: "Mais antigos",
};

const filterOptions = {
    all: "Todos",
    active: "Ativos",
    inactive: "Inativos",
    debtor: "Devedores",
};

const TableLayout: React.FC<TableLayoutProps> = ({
    children,
    pageProps,
    onClickAdd,
    title,
    showAdd,
    addTitle,
    showSearch,
    showOrderBy,
    showFilter,
    onChangeFilter,
    onChangeOrderBy,
    onChangeSearch,
}) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <GlobalLayout pageProps={pageProps}>
            <div className="w-full h-full flex mx-auto flex-col p-8 gap-6">
                <div className="flex flex-wrap justify-center md:justify-between gap-6">
                    <div className="flex flex-col gap-6 w-full md:w-80">
                        <div className="flex gap-4 items-center justify-between">
                            <h1 className="text-6xl font-bold">{title}</h1>
                            <When condition={showAdd}>
                                <button
                                    type="button"
                                    onClick={onClickAdd}
                                    title={addTitle}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-2 font-medium rounded-full text-2xl text-center h-fit aspect-square"
                                >
                                    <AiFillPlusCircle />
                                </button>
                            </When>
                        </div>
                        <When condition={showSearch}>
                            <div className="relative z-0 w-full group">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={onChangeSearch}
                                />
                                <label
                                    htmlFor="search"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Pesquisar pelo nome...
                                </label>
                            </div>
                        </When>
                    </div>

                    <div className="flex flex-col gap-6 justify-between w-full md:w-80 items-end">
                        <When condition={showOrderBy}>
                            <div className="relative z-0 w-full group mt-auto">
                                <select
                                    name="orderBy"
                                    id="orderBy"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={onChangeOrderBy}
                                >
                                    {Object.entries(orderByOptions).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                                <label
                                    htmlFor="orderBy"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Ordenar por:
                                </label>
                            </div>
                        </When>
                        <When condition={showFilter}>
                            <div className="relative z-0 w-full group mt-auto">
                                <select
                                    name="filter"
                                    id="filter"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={onChangeFilter}
                                >
                                    {Object.entries(filterOptions).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                                <label
                                    htmlFor="filter"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Exibir apenas:
                                </label>
                            </div>
                        </When>
                    </div>
                </div>
                {children}
            </div>
        </GlobalLayout>
    );
};

export default TableLayout;
