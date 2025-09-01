import React from 'react';
import {CircularProgress, Container} from "@mui/material";

const LoadingPage = ({isLoading}) => {
  return (
    <Container sx={{display: isLoading ? "flex" : "none",
      justifyContent: "center", alignItems: "center", width: "100%",
      paddingY: 3, height: {md: "50vh", xs: "20vh"}}}>

      <CircularProgress />
    </Container>
  );
};

export default LoadingPage;