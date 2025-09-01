import React from 'react';
import {Container, Stack, Typography} from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container>
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h1" color="textSecondary"
                    sx={{ fontFamily: "Rubik Glitch", letterSpacing: 10}}
        >404</Typography>
        <Typography variant="h5" color="textSecondary" component="div">
          Извините, но страница по данному адресу не найдена
        </Typography>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;