import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { Button, Space } from 'antd';
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from "./themes";
import {CookiesProvider}  from "react-cookie"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <ChakraProvider>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </ChakraProvider>
    </CookiesProvider>
  </BrowserRouter>
);