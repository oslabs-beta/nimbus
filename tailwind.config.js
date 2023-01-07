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
          "primary": "#623cad",  
          "secondary": "#3a3279", 
          "accent": "#ae6db0",
          "neutral": "#232343",
          "base-100": "#0f0f31",
          "base-300": "#e4d5ff",
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
