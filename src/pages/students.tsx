import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { Tooltip } from "flowbite-react";
import { useFormik } from "formik";
import { HeadFC, navigate, PageProps } from "gatsby";
import moment from "moment";
import React, { useMemo, useState } from "react";
import SEO from "../components/SEO";
import Table, { TableActions } from "../components/Table";
import { useFirestoreList } from "../hooks/useFirestoreList";
import TableLayout from "../layouts/Table";
import { updateFirestoreDoc } from "../services/firestore";
import swal from "../services/swal";

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

const verifyDebtor = (lastPayment: string, recurrence: string) => {
    const lastPaymentDate = moment(lastPayment);
    const today = moment();

    switch (recurrence) {
        case "monthly":
            return !lastPaymentDate.add(1, "month").isBefore(today);

        case "bimonthly":
            return !lastPaymentDate.add(2, "months").isBefore(today);

        case "quarterly":
            return !lastPaymentDate.add(3, "months").isBefore(today);

        case "semiannual":
            return !lastPaymentDate.add(6, "months").isBefore(today);

        case "annual":
            return !lastPaymentDate.add(1, "year").isBefore(today);
        default:
            return true;
    }
};

const Students: React.FC<PageProps> = (props) => {
    //* hooks
    const { data, mutate } = useFirestoreList("students");
    const { data: plans } = useFirestoreList("plans");

    const formik = useFormik({
        initialValues: {
            orderBy: "ascending",
            filter: "all",
        },
        onSubmit: () => {},
    });

    //* states
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

    //* constants
    const actions: TableActions = useMemo(() => {
        return (row) => [
            {
                text: "Enviar mensagem",
                onClick: (e) => {
                    if (e.original.whatsapp && e.original.name) {
                        window
                            .open(
                                `https://api.whatsapp.com/send?phone=${encodeURIComponent(
                                    (e.original.whatsapp as string).replace(
                                        /[()+ -.]/g,
                                        ""
                                    )
                                )}&text=${encodeURIComponent(
                                    `Olá, ${e.original.name}`
                                )}`,
                                "_blank"
                            )
                            ?.focus();
                    }
                },
            },
            {
                text: "Atualizar pagamento para hoje",
                onClick: async (e) => {
                    swal.fire({
                        title: "Tem certeza?",
                        text: "Você não poderá reverter isso!",
                        icon: "warning",
                        showCancelButton: true,
                        background: "#4e4e4e",
                        color: "#fff",
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sim, continuar!",
                        cancelButtonText: "Cancelar",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await updateFirestoreDoc(
                                "students",
                                e.original.id as string,
                                {
                                    updatedAt: new Date()
                                        .toISOString()
                                        .slice(0, 10),
                                    lastPayment: new Date()
                                        .toISOString()
                                        .slice(0, 10),
                                    paidToday: true,
                                }
                            );

                            mutate();

                            swal.fire({
                                title: "Data de pagamento alterada com sucesso!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                                background: "#4e4e4e",
                                color: "#fff",
                            });
                        }
                    });
                },
            },
            {
                text: "Editar",
                onClick: (e) => navigate(`/student?id=${e.original.id}`),
            },
            {
                text:
                    (row.original.status as any).props.content === "Aluno Ativo"
                        ? "Inativar"
                        : "Ativar",
                onClick: async (e) => {
                    swal.fire({
                        title: "Tem certeza?",
                        text: "Você poderá reverter isso!",
                        icon: "warning",
                        showCancelButton: true,
                        background: "#4e4e4e",
                        color: "#fff",
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sim, continuar!",
                        cancelButtonText: "Cancelar",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await updateFirestoreDoc(
                                "students",
                                e.original.id as string,
                                {
                                    updatedAt: new Date()
                                        .toISOString()
                                        .slice(0, 10),
                                    status:
                                        (e.original.status as any).props
                                            .content === "Aluno Ativo"
                                            ? "inactive"
                                            : "active",
                                }
                            );

                            mutate();

                            swal.fire({
                                title: "Status alterado com sucesso!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                                background: "#4e4e4e",
                                color: "#fff",
                            });
                        }
                    });
                },
            },
        ];
    }, [mutate]);

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
            onChangeSearch={(e) => {
                if (searchTimeout) clearTimeout(searchTimeout);
                setSearchTimeout(
                    setTimeout(() => {
                        setSearch(e?.target?.value);
                    }, 500)
                );
            }}
        >
            <Table
                search={search}
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
                        if (
                            formik.values.filter === "debtor" &&
                            !verifyDebtor(e.lastPayment, e?.planRecurrence)
                        )
                            return true;
                        if (
                            formik.values.filter === "not-debtor" &&
                            !!verifyDebtor(e.lastPayment, e?.planRecurrence)
                        )
                            return true;
                    })
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
                        debtor: !verifyDebtor(
                            e.lastPayment,
                            e?.planRecurrence
                        ) ? (
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
                        plan: plans.find((p) => p.id === e.plan)?.name,
                    }))}
                actions={actions}
            />
        </TableLayout>
    );
};

export default Students;

export const Head: HeadFC = () => <SEO title="Evolução Fitness - Alunos" />;
