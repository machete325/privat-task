import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from 'styled-components';
import './index.css';

const baseTheme = {
    background: '#000',
    color: '#222',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={baseTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
