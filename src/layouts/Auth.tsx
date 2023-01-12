import React from "react";

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
        <div className="w-full h-full flex items-center justify-center">
            {children}
        </div>
    );
};

export default AuthLayout;
