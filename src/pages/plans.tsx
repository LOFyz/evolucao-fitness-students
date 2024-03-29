import { HeadFC, navigate, PageProps } from "gatsby";
import React, { useMemo } from "react";
import SEO from "../components/SEO";
import Table, { TableActions } from "../components/Table";
import { useFirestoreList } from "../hooks/useFirestoreList";
import TableLayout from "../layouts/Table";
import { deleteFirestoreDoc } from "../services/firestore";
import swal from "../services/swal";
import { recurrences } from "./plan";

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
    const { data, mutate } = useFirestoreList("plans");
    const { data: students } = useFirestoreList("students");

    //* states

    //* constants
    const actions: TableActions = useMemo(() => {
        return () => [
            {
                text: "Editar",
                onClick: (e) => navigate(`/plan?id=${e.original.id}`),
            },
            {
                text: "Excluir",
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
                        confirmButtonText: "Sim, excluir!",
                        cancelButtonText: "Cancelar",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await deleteFirestoreDoc(
                                "plans",
                                e.original.id as string
                            );

                            mutate();

                            swal.fire({
                                title: "Plano removido com sucesso!",
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
            <Table
                columns={columns}
                data={data.map((e) => ({
                    ...e,
                    recurrence: recurrences[e?.recurrence],
                    subscribers: students.filter(
                        (student) => student.plan === e.id
                    ).length,
                }))}
                actions={actions}
            />
        </TableLayout>
    );
};

export default Plans;

export const Head: HeadFC = () => <SEO title="Evolução Fitness - Planos" />;
