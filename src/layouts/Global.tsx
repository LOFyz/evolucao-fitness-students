import "flowbite/dist/flowbite.min.js";
import { PageProps } from "gatsby";
import React from "react";
import { AuthProvider } from "../contexts/AuthProvider";

type GlobalLayoutProps = {
    children?: React.ReactNode;
    pageProps: PageProps;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, pageProps }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <AuthProvider pageProps={pageProps}>
            <div id="root" className="overflow-x-hidden">
                <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>
                {children}
            </div>
        </AuthProvider>
    );
};

export default GlobalLayout;
