/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {},
    },
    content: [
        "./index.html",
        "./script.js"
    ],
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.color-selected': {
                    '@apply scale-110 ring-1 ring-black ring-offset-1 ring-offset-white transition-transform duration-150 ease-in-out': {},
                },
            });
        },
    ],
};
