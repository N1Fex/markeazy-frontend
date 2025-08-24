import React from 'react';
import {useParams} from "react-router-dom";
import {Container, Typography} from "@mui/material";

const ProductPage = () => {

  const {id} = useParams();

  return (
    <Container sx={{height: 400, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h4">Product ID is {id}</Typography>
    </Container>
  );
};

export default ProductPage;