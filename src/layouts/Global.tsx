import "flowbite/dist/flowbite.min.js";
import React from "react";

interface GlobalLayoutProps {
    children?: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <div id="root">
            <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>

            {children}
        </div>
    );
};

export default GlobalLayout;
