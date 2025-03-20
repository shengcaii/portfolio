/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    start: 'rgb(var(--background-start-rgb))',
                    end: 'rgb(var(--background-end-rgb))',
                },
                text: {
                    primary: 'rgb(var(--foreground-rgb))',
                    muted: 'rgb(var(--text-muted))',
                },
            },
            backgroundColor: {
                'admin-card': 'rgb(255, 255, 255)',
                'admin-action': 'rgb(243, 244, 246)',
                'admin-action-hover': 'rgb(229, 231, 235)',
            },
            textColor: {
                'admin-text': 'rgb(17, 24, 39)',
                'admin-text-muted': 'rgb(75, 85, 99)',
            },
            borderColor: {
                'admin-border': 'rgb(229, 231, 235)',
            },
        },
    },
    darkMode: 'media',
    plugins: [],
}