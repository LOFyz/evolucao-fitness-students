import { PageProps } from "gatsby";
import React from "react";

type AuthLayoutProps = {
    children?: React.ReactNode;
    pageProps: PageProps;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center animate-zoom-in ">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
