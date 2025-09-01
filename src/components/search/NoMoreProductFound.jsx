import React from 'react';
import {Container, Typography} from "@mui/material";
import SearchOff from "@mui/icons-material/SearchOff";

const NoMoreProductFound = () => {
  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      width: "100%", paddingY: 3, height: "20vh", gap: 1}}>

      <SearchOff sx={{fontSize: 54, fill: "#606060"}} />
      <Typography variant="h5" color="textSecondary" component="div">
        Увы, больше не найдено заданных товаров
      </Typography>

    </Container>
  );
};

export default NoMoreProductFound;