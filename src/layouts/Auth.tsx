import React from "react";
import GlobalLayout from "./Global";

interface AuthLayoutProps {
    children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <GlobalLayout>
            <div className="w-full h-full flex items-center justify-center">
                {children}
            </div>
        </GlobalLayout>
    );
};

export default AuthLayout;
