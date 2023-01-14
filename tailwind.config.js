/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/layouts/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            primary: "#000",
            "primary-light": "#000",
            "primary-dark": "#000",
            secondary: "#000",
            "secondary-light": "#000",
            "secondary-dark": "#000",
            background: "#000",
            "background-light": "#000",
            "background-dark": "#000",
            text: "#000",
            "text-light": "#000",
            "text-dark": "#000",
        },
        extend: {},
    },
    plugins: [require("flowbite/plugin")],
};
