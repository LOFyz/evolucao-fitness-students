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
        extend: {
            animation: {
                "slide-from-left": "slide-from-left 0.25s ease-in-out",
                "slide-from-right": "slide-from-right 0.25s ease-in-out",
                "zoom-in": "zoom-in 0.25s ease-in-out",
            },
            keyframes: {
                "slide-from-left": {
                    "0%": { transform: "translateX(-100%)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                "slide-from-right": {
                    "0%": { transform: "translateX(100%)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                "zoom-in": {
                    "0%": { transform: "scale(0)", opacity: 0 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
