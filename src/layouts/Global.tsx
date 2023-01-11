import "flowbite/dist/flowbite.min.js";
import React from "react";

interface GlobalProps {
    children?: React.ReactNode;
}

const Global: React.FC<GlobalProps> = ({ children }) => {
    //* hooks

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <>
            <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script>

            {children}
        </>
    );
};

export default Global;
