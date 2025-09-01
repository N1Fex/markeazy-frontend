import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NeedToBeLoggedIn = () => {

  const navigate = useNavigate();

  return (
      <Stack sx={{ minHeight: "50vh"}} alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h5" textAlign="center">Вы должны быть авторизированы, чтобы увидеть эту страницу</Typography>
        <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}>Войти</Button>
      </Stack>
  );
};

export default NeedToBeLoggedIn;