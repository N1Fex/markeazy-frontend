import React from 'react';
import {Button, Container, InputLabel, Stack, TextField, Typography} from "@mui/material";

const PasswordRecovery = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Container sx={{border: "solid 3px black",
      borderRadius: "8px",
      width: {sm: 450, xs: "min(400px, 95%)"},
      marginY: 4,
    }}>
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
    </Container>
  )
};

export default PasswordRecovery;