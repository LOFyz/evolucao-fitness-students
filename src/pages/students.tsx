import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { Tooltip } from "flowbite-react";
import { useFormik } from "formik";
import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import Table from "../components/Table";
import TableLayout from "../layouts/Table";

const filterOptions = {
    all: "Todos",
    debtor: "Devedores",
    "not-debtor": "Não Devedores",
    active: "Ativos",
    inactive: "Inativos",
};

const columns = [
    { Header: "Possui debitos", accessor: "debtor" },
    { Header: "Status", accessor: "status" },
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
        id: 1,
        debtor: true,
        name: "Aluno 1",
        whatsapp: "+55 (99) 9.9999-9999",
        lastPayment:
            "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        createdAt: "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        cpf: "111.111.111-11",
        plan: "Plano 1",
        status: "active",
    },
    {
        id: 1,
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
        id: 1,
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
    {
        id: 1,
        debtor: true,
        name: "Fulano",
        whatsapp: "11999999999",
        lastPayment:
            "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        createdAt: "Sat Jan 14 2023 00:43:05 GMT-0300 (Brasilia Standard Time)",
        cpf: "111.111.111-11",
        plan: "Plano 1",
        status: "active",
    },
    {
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
    {
        id: 1,
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
        id: 1,
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
        id: 1,
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
                data={data
                    .filter((e) => {
                        if (formik.values.filter === "all") return true;
                        if (
                            formik.values.filter === "active" &&
                            e.status === "active"
                        )
                            return true;
                        if (
                            formik.values.filter === "inactive" &&
                            e.status === "inactive"
                        )
                            return true;
                        if (formik.values.filter === "debtor" && e.debtor)
                            return true;
                        if (formik.values.filter === "not-debtor" && !e.debtor)
                            return true;
                    })
                    .filter((e) =>
                        e.name
                            .toLowerCase()
                            .normalize()
                            .includes(
                                formik.values.search.toLowerCase().normalize()
                            )
                    )
                    .sort((a, b) => {
                        if (formik.values.orderBy === "ascending") {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }
                        if (formik.values.orderBy === "descending") {
                            if (a.name > b.name) return -1;
                            if (a.name < b.name) return 1;
                            return 0;
                        }
                        if (formik.values.orderBy === "oldest") {
                            if (a.createdAt < b.createdAt) return -1;
                            if (a.createdAt > b.createdAt) return 1;
                            return 0;
                        }
                        if (formik.values.orderBy === "newest") {
                            if (a.createdAt > b.createdAt) return -1;
                            if (a.createdAt < b.createdAt) return 1;
                            return 0;
                        }
                        return 0;
                    })
                    .map((e) => ({
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
                        lastPayment: new Date(
                            e.lastPayment
                        ).toLocaleDateString(),
                        createdAt: new Date(e.createdAt).toLocaleDateString(),
                        status:
                            e.status === "active" ? (
                                <Tooltip content="Aluno Ativo">
                                    <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
                                </Tooltip>
                            ) : (
                                <Tooltip content="Aluno Inativo">
                                    <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
                                </Tooltip>
                            ),
                    }))}
                actions={(row) => [
                    {
                        text: "Enviar mensagem",
                        onClick: (e) => {
                            if (e.original.whatsapp && e.original.name) {
                                window
                                    .open(
                                        `https://api.whatsapp.com/send?phone=${encodeURIComponent(
                                            (
                                                e.original.whatsapp as string
                                            ).replace(/[()+ -.]/g, "")
                                        )}&text=${encodeURIComponent(
                                            `Olá,
                                            ${e.original.name}`
                                        )}`,
                                        "_blank"
                                    )
                                    ?.focus();
                            }
                        },
                    },
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

export const Head: HeadFC = () => <SEO title="Evolução Fitness - Alunos" />;
