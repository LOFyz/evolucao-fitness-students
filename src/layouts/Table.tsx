import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import { HiUserCircle } from "@react-icons/all-files/hi/HiUserCircle";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
import { Link, PageProps } from "gatsby";
import React, { HTMLProps } from "react";
import { When } from "react-if";

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
    className?: string;
    filterOptions?: Record<string, string>;
} & HTMLProps<HTMLDivElement>;

const orderByOptions = {
    ascending: "A-Z",
    descending: "Z-A",
    newer: "Mais recentes",
    older: "Mais antigos",
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
    className,
    filterOptions = { all: "Todos" },
    ...rest
}) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <div
            className={`w-full h-full flex mx-auto flex-col p-8 gap-6 bg-gradient-to-br from-background to-gray-900${
                className ? ` ${className}` : ""
            }`}
            {...rest}
        >
            <div className="flex flex-wrap justify-center md:justify-between gap-6">
                <div
                    className={`flex flex-col gap-6 w-full${
                        showSearch ? " md:w-80" : "md:w-fit"
                    }`}
                >
                    <div className="flex gap-4 items-center justify-between">
                        <h1 className="text-6xl font-bold text-primary">
                            {title}
                        </h1>
                        <When condition={showAdd}>
                            <button
                                type="button"
                                onClick={onClickAdd}
                                title={addTitle}
                                className="text-text bg-gradient-to-r from-secondary via-primary to-primary hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark p-2 font-medium rounded-full text-2xl text-center h-fit aspect-square transition-all"
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
                                className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=" "
                                onChange={onChangeSearch}
                            />
                            <label
                                htmlFor="search"
                                className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=" "
                                onChange={onChangeOrderBy}
                            >
                                {Object.entries(orderByOptions).map(
                                    ([key, value]) => (
                                        <option
                                            key={key}
                                            value={key}
                                            className="text-primary bg-background-light"
                                        >
                                            {value}
                                        </option>
                                    )
                                )}
                            </select>
                            <label
                                htmlFor="orderBy"
                                className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=" "
                                onChange={onChangeFilter}
                            >
                                {Object.entries(filterOptions).map(
                                    ([key, value]) => (
                                        <option
                                            key={key}
                                            value={key}
                                            className="text-primary bg-background-light"
                                        >
                                            {value}
                                        </option>
                                    )
                                )}
                            </select>
                            <label
                                htmlFor="filter"
                                className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Exibir apenas:
                            </label>
                        </div>
                    </When>
                </div>
            </div>
            {children}
            <div className="border-b border-background-light dark:border-gray-700 mt-auto">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-text dark:text-gray-400 justify-end">
                    <li className="mr-2">
                        <Link
                            to="/students"
                            className={
                                pageProps.location.pathname.includes(
                                    "/students"
                                )
                                    ? "inline-flex p-4 text-primary border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group transition-all"
                                    : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-text hover:border-background-light dark:hover:text-background-light group transition-all"
                            }
                        >
                            <HiUserCircle
                                className={`w-5 h-5 mr-2${
                                    pageProps.location.pathname.includes(
                                        "/students"
                                    )
                                        ? " text-primary dark:text-blue-500 transition-all"
                                        : " text-gray-400 group-hover:text-text dark:text-text dark:group-hover:text-background-light transition-all"
                                }`}
                            />
                            Alunos
                        </Link>
                    </li>
                    <li className="mr-2">
                        <Link
                            to="/plans"
                            className={
                                pageProps.location.pathname.includes("/plans")
                                    ? "inline-flex p-4 text-primary border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group transition-all"
                                    : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-text hover:border-background-light dark:hover:text-background-light group transition-all"
                            }
                        >
                            <MdDashboard
                                className={`w-5 h-5 mr-2${
                                    pageProps.location.pathname.includes(
                                        "/plans"
                                    )
                                        ? " text-primary dark:text-blue-500 transition-all"
                                        : " text-gray-400 group-hover:text-text dark:text-text dark:group-hover:text-background-light transition-all"
                                }`}
                            />
                            Planos
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TableLayout;
