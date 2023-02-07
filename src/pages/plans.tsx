import { HeadFC, navigate, PageProps } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import Table, { TableActions } from "../components/Table";
import { useFirestoreList } from "../hooks/useFirestoreList";
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

const actions: TableActions = () => [
    { text: "Editar", onClick: (e) => navigate(`/plan?id=${e.original.id}`) },
    { text: "Excluir", onClick: (e) => console.log(e) },
];

const Plans: React.FC<PageProps> = (props) => {
    //* hooks
    const data = useFirestoreList("plans");

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
