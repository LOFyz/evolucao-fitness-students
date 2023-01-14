import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import Table from "../components/Table";
import TableLayout from "../layouts/Table";

const columns = [
    {
        Header: "Nome",
        accessor: "name",
    },
    {
        Header: "Recorrência",
        accessor: "recurrence",
    },
    {
        Header: "Inscritos",
        accessor: "subscribers",
    },
    {
        Header: "Valor",
        accessor: "value",
    },
];

const Plans: React.FC<PageProps> = (props) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <TableLayout
            pageProps={props}
            title="Planos"
            showAdd
            addTitle="Adicionar Plano"
            onClickAdd={() => navigate("/plan")}
            className="animate-slide-from-left"
        >
            <Table columns={columns} />
        </TableLayout>
    );
};

export default Plans;

export const Head: HeadFC = () => <SEO />;
