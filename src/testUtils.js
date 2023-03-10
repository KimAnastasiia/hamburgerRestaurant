import React from "react";
import { ChakraProvider } from '@chakra-ui/react'

export const ThemeWrapper = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);