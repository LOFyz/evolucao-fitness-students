import { PageProps } from "gatsby";
import React from "react";
import GlobalLayout from "./Global";

interface AuthLayoutProps {
    children?: React.ReactNode;
    pageProps: PageProps;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, pageProps }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <GlobalLayout pageProps={pageProps}>
            <div className="w-full h-full flex items-center justify-center">
                {children}
            </div>
        </GlobalLayout>
    );
};

export default AuthLayout;
