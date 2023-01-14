import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import TableLayout from "../layouts/Table";

const filterOptions = {
    all: "Todos",
    active: "Ativos",
    inactive: "Inativos",
    debtor: "Devedores",
};

const Students: React.FC<PageProps> = (props) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <TableLayout
            pageProps={props}
            title="Alunos"
            showAdd
            showFilter
            showOrderBy
            showSearch
            addTitle="Adicionar Aluno"
            onClickAdd={() => navigate("/student")}
            className="animate-slide-from-right"
            filterOptions={filterOptions}
        >
            <div></div>
        </TableLayout>
    );
};

export default Students;

export const Head: HeadFC = () => <SEO />;
