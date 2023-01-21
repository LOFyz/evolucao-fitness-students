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

const data = [
    {
        id: 1,
        name: "Plano 1",
        recurrence: "Mensal",
        subscribers: 10,
        value: 100,
    },
    {
        id: 2,
        name: "Plano 2",
        recurrence: "Trimestral",
        subscribers: 10,
        value: 100,
    },
    {
        id: 3,
        name: "Plano 3",
        recurrence: "Anual",
        subscribers: 10,
        value: 100,
    },
];

const actions = () => [
    { text: "Editar", onClick: (e) => console.log(e) },
    { text: "Excluir", onClick: (e) => console.log(e) },
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
            onAnimationEnd={() => {
                document
                    .querySelectorAll(".tooltip")
                    .forEach((element) =>
                        element.setAttribute("style", "position:absolute;")
                    );
            }}
        >
            <Table columns={columns} data={data} actions={actions} />
        </TableLayout>
    );
};

export default Plans;

export const Head: HeadFC = () => <SEO title="Evolução Fitness - Planos" />;
