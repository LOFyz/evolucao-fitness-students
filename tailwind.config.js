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
            primary: "#f84f0d",
            "primary-light": "#ff8341",
            "primary-dark": "#bd0d00",
            secondary: "#f4f4f4",
            "secondary-light": "#ffffff",
            "secondary-dark": "#c1c1c1",
            background: "#262626",
            "background-light": "#4e4e4e",
            "background-dark": "#000",
            text: "#f4f4f4",
            "text-light": "#ffffff",
            "text-dark": "#000",
        },
        extend: {
            animation: {
                "slide-from-left": "slide-from-left 0.25s ease-in-out",
                "slide-from-right": "slide-from-right 0.25s ease-in-out",
                "zoom-in": "zoom-in 0.50s ease-in-out",
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
                    "50%": { transform: "scale(1.1)", opacity: 1 },
                    "75%": { transform: "scale(1.1)", opacity: 1 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
