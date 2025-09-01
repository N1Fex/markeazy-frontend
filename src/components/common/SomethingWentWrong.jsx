import React from 'react';
import {Container, Typography} from "@mui/material";

const SomethingWentWrong = ({isError}) => {
  return (
    <Container sx={{ display: isError ? "flex" : "none", paddingY: 3, height: {md: "50vh", xs: "20vh"},
                    alignItems: "center", justifyContent: "center"}}>
      <Typography variant="h5" align="center">
        Что-то пошло не так, попробуйте снова спустя некоторое время.
      </Typography>
    </Container>
  );
};

export default SomethingWentWrong;