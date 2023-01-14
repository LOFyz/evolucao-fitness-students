import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import TableLayout from "../layouts/Table";

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
        >
            <div></div>
        </TableLayout>
    );
};

export default Plans;

export const Head: HeadFC = () => <SEO />;
