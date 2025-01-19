/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2a4a7f',
        },
        secondary: {
          DEFAULT: '#c7a007',
          light: '#e3b708',
        },
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      backgroundImage: {
        'journey-pattern': "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')",
      },
    },
  },
  plugins: [],
};