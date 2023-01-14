import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { useFormik } from "formik";
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
    { Header: "Status", accessor: "debtor" },
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

const data = [
    {
        debtor: true,
        name: "Aluno 1",
        whatsapp: "11999999999",
        lastPayment:
            "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        createdAt: "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        cpf: "111.111.111-11",
        plan: "Plano 1",
        status: "active",
    },
    {
        debtor: false,
        name: "Aluno 2",
        whatsapp: "11999999999",
        lastPayment:
            "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        createdAt: "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        cpf: "111.111.111-11",
        plan: "Plano 1",
        status: "inactive",
    },
    {
        debtor: false,
        name: "Aluno 3",
        whatsapp: "11999999999",
        lastPayment:
            "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        createdAt: "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        cpf: "111.111.111-11",
        plan: "Plano 1",
        status: "active",
    },
];

const Students: React.FC<PageProps> = (props) => {
    //* hooks
    const formik = useFormik({
        initialValues: {
            search: "",
            orderBy: "ascending",
            filter: "all",
        },
        onSubmit: () => {},
    });

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
            onChangeFilter={formik.handleChange}
            onChangeOrderBy={formik.handleChange}
            onChangeSearch={formik.handleChange}
        >
            <Table
                columns={columns}
                data={data.map((e) => ({
                    ...e,
                    debtor: e.debtor ? (
                        <div className="flex items-center gap-2 text-red-500">
                            <AiFillCloseCircle /> Devedor
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-green-500">
                            <AiFillCheckCircle /> Nao Devedor
                        </div>
                    ),
                    lastPayment: new Date(e.lastPayment).toLocaleDateString(),
                    createdAt: new Date(e.createdAt).toLocaleDateString(),
                }))}
                actions={(row) => [
                    { text: "Enviar mensagem", onClick: (e) => console.log(e) },
                    {
                        text: "Atualizar pagamento para hoje",
                        onClick: (e) => console.log(e),
                    },
                    { text: "Editar", onClick: (e) => console.log(e) },
                    {
                        text:
                            row.original.status === "active"
                                ? "Inativar"
                                : "Ativar",
                        onClick: (e) => console.log(e),
                    },
                ]}
            />
        </TableLayout>
    );
};

export default Students;

export const Head: HeadFC = () => <SEO />;
