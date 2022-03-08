import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme'
import App from './App';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-responsive-modal/styles.css';

ReactDOM.render(
    <React.StrictMode >
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);