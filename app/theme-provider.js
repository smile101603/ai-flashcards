// components/ThemeProvider.js
'use client'; // Ensures this component is rendered on the client side

import { Montserrat } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create Montserrat font instance
const montserrat = Montserrat({
  weights: [400, 500, 700, 900],
  subsets: ['latin'],
});

// Create MUI theme with Montserrat
const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: montserrat.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: montserrat.style.fontFamily,
        },
      },
    },
    // Add more component styles here if needed
  },
});

export default function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
