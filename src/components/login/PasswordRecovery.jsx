import React from 'react';
import {Button, InputLabel, Stack, TextField, Typography} from "@mui/material";
import FormContainer from "./FormContainer";

const PasswordRecovery = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <FormContainer>
      <Stack direction="column" justifyContent="space-around" sx={{paddingTop: 2, paddingBottom: 2}}>
        <Typography variant="h5" align="center">
          Восстановление доступа
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
            Email
          </InputLabel>
          <TextField
            id="email"
            type="email"
            placeholder="Введите почту"
            variant="outlined"
            fullWidth
            required
          />

          <Button variant="contained" color="primary" sx={{marginTop: 2}} fullWidth>
            Отправить код
          </Button>
        </form>
      </Stack>
    </FormContainer>
  )
};

export default PasswordRecovery;