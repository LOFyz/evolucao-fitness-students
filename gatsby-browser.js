import React from "react";
import "./src/styles/global.css";
import GlobalLayout from "./src/layouts/Global";

export const wrapRootElement = ({ element }) => (
    <GlobalLayout>{element}</GlobalLayout>
);
