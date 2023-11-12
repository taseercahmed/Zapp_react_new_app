import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
const appbarcolor="#277e85";
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: appbarcolor,
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
root.render(
  <React.StrictMode >
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
   
  </React.StrictMode>
);

reportWebVitals();
