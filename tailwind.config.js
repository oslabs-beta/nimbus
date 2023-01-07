/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/components/**/*.{js,jsx,ts,tsx}',
    './client/containers/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myThemeDark: {  
          "primary": "#6868AC",  
          "secondary": "#475378", 
          "accent": "#F471B5",
          "neutral": "#1D283A",
          "base-100": "#111827",
          "info": "#0CA6E9",
          "success": "#2BD4BD",
          "warning": "#F4C152",
          "error": "#FB6F84",
        },
        myThemeLight: {
          "primary": "#DECCFF",  
          "secondary": "#ece2ff",   
          "accent": "#f6d5ff",  
          "neutral": "#f6eefd",    
          "base-100": "#FFFFFF",
          "base-300": '#5d597a',    
          "info": "#3ABFF8",      
          "success": "#36D399",     
          "warning": "#FBBD23",      
          "error": "#F87272",
        },
      },
    ],
  },
};
