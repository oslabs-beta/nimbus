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
          "primary": "#4f46e5",  
          "secondary": "#828DF8", 
          "accent": "#F471B5",
          "neutral": "#1D283A",
          "base-100": "#111827",
          "info": "#0CA6E9",
          "success": "#2BD4BD",
          "warning": "#F4C152",
          "error": "#FB6F84",
        },
        myThemeLight: {
          "primary": "#4F46E5",  
          "secondary": "#828DF8",   
          "accent": "#F471B5",  
          "neutral": "#3D4451",    
          "base-100": "#FFFFFF",    
          "info": "#3ABFF8",      
          "success": "#36D399",     
          "warning": "#FBBD23",      
          "error": "#F87272",
        },
      },
    ],
  },
};
