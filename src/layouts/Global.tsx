import "flowbite/dist/flowbite.min.js";
import React from "react";
import { AuthProvider } from "../contexts/AuthProvider";

type GlobalLayoutProps = {
    children?: React.ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <AuthProvider>
            <div id="root" className="overflow-x-hidden bg-background">
                <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>
                {children}
            </div>
        </AuthProvider>
    );
};

export default GlobalLayout;
