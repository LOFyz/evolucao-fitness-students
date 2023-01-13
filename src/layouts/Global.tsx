import "flowbite/dist/flowbite.min.js";
import { PageProps } from "gatsby";
import React from "react";
import { AuthProvider } from "../contexts/AuthProvider";

interface GlobalLayoutProps {
    children?: React.ReactNode;
    pageProps: PageProps;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, pageProps }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <AuthProvider pageProps={pageProps}>
            <div id="root">
                <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>
                {children}
            </div>
        </AuthProvider>
    );
};

export default GlobalLayout;
