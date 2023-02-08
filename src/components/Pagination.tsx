/* eslint-disable react/no-unused-prop-types */
import React, { memo } from "react";

interface PaginationProps {
    canPreviousPage?: boolean;
    canNextPage?: boolean;
    gotoPage: (index: number) => void; // eslint-disable-line no-unused-vars
    previousPage: () => void;
    nextPage: () => void;
    pageCount: number;
    pageIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({
    gotoPage,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageCount,
    pageIndex,
}) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <div>
            <ul className="justify-end flex gap-2 p-3">
                <li
                    className={
                        canPreviousPage
                            ? "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center"
                            : "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center opacity-70"
                    }
                >
                    <button
                        type="button"
                        className="w-full h-full rounded-full"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>
                </li>
                <li
                    className={
                        canPreviousPage
                            ? "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center"
                            : "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center opacity-70"
                    }
                >
                    <button
                        type="button"
                        className="w-full h-full rounded-full"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>
                </li>
                {pageIndex - 1 > 0 && (
                    <li className="transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center">
                        <button
                            className="w-full h-full rounded-full cursor-default"
                            type="button"
                        >
                            ...
                        </button>
                    </li>
                )}
                {pageIndex > 0 && (
                    <li className="transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center">
                        <button
                            type="button"
                            className="w-full h-full rounded-full"
                            onClick={() => previousPage()}
                        >
                            {pageIndex}
                        </button>
                    </li>
                )}
                <li className="transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center border border-primary">
                    <button
                        className="w-full h-full rounded-full"
                        type="button"
                    >
                        {pageIndex + 1}
                    </button>
                </li>
                {pageIndex + 1 < pageCount && (
                    <li className="transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center">
                        <button
                            type="button"
                            className="w-full h-full rounded-full"
                            onClick={() => gotoPage(pageIndex + 1)}
                        >
                            {pageIndex + 2}
                        </button>
                    </li>
                )}
                {pageIndex + 2 < pageCount && (
                    <li className="transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center">
                        <button
                            className="w-full h-full rounded-full cursor-default"
                            type="button"
                        >
                            ...
                        </button>
                    </li>
                )}
                <li
                    className={
                        canNextPage
                            ? "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center"
                            : "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center opacity-70"
                    }
                >
                    <button
                        type="button"
                        className="w-full h-full rounded-full"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>
                </li>
                <li
                    className={
                        canNextPage
                            ? "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center"
                            : "transition-all text-text bg-background-light rounded-full aspect-square w-10 text-center opacity-70"
                    }
                >
                    <button
                        type="button"
                        className="w-full h-full rounded-full"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default memo(Pagination);
