import React from "react";

// Chakra UI

import { Container, Box } from "@chakra-ui/react";

// Components
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box marginTop={8}>{children}</Box>
    </>
  );
};

export default Layout;
