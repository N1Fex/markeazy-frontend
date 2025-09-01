import React from 'react';
import {Container} from "@mui/material";

const FormContainer = (props) => {
  return (
    <Container sx={{
      boxShadow: "5px 5px 18px black",
      borderRadius: "8px",
      width: {sm: 450, xs: "min(400px, 95%)"},
      marginY: 4}}
    >
      {props.children}
    </Container>
  );
};

export default FormContainer;