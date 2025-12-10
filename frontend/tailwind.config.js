/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                retro: {
                    bg: '#FDFCF0',    // Cream / Sand
                    primary: '#E76F51', // Sunset Orange
                    secondary: '#264653', // Deep Teal
                    accent: '#E9C46A', // Mustard Yellow
                    surf: '#2A9D8F',   // Faded Blue
                    dark: '#1D3557',
                }
            },
            fontFamily: {
                display: ['Shrikhand', 'cursive'],
                body: ['"DM Sans"', 'sans-serif'],
            },
            boxShadow: {
                'retro': '4px 4px 0px 0px rgba(38, 70, 83, 1)', // Hard shadow
                'retro-hover': '2px 2px 0px 0px rgba(38, 70, 83, 1)',
            }
        },
    },
    plugins: [],
}
