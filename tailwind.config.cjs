/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mn: ['Mansalva', 'sans-serif'],
                pd: ['Playfair Display', 'serif'],
            },
            colors: {
                tr: ['#bc1823'],
                darkTR: ['#8F111A'],
                cr: ['#fff9f3']
            },
        },
    },
    plugins: [],
};