import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import Table from "../components/Table";
import TableLayout from "../layouts/Table";

const filterOptions = {
    all: "Todos",
    active: "Ativos",
    inactive: "Inativos",
    debtor: "Devedores",
};

const columns = [
    { Header: "Não Devedor", accessor: "debtor" },
    {
        Header: "Nome",
        accessor: "name",
    },
    {
        Header: "WhatsApp",
        accessor: "whatsapp",
    },
    {
        Header: "Ultimo Pagamento",
        accessor: "lastPayment",
    },
    {
        Header: "Data de Cadastro",
        accessor: "createdAt",
    },
    {
        Header: "CPF",
        accessor: "cpf",
    },
    {
        Header: "Plano",
        accessor: "plan",
    },
];

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
            <Table columns={columns} />
        </TableLayout>
    );
};

export default Students;

export const Head: HeadFC = () => <SEO />;
