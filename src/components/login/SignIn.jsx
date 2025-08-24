import {Button, InputLabel, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const SignIn = ({email, setEmail, setPage}) => {

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
        Email
      </InputLabel>
      <TextField
        id="email"
        type="email"
        placeholder="Введите почту"
        variant="outlined"
        value={email}
        onChange={handleChange}
        fullWidth
        required
      />

      <Stack direction="row" justifyContent="space-between" sx={{marginTop: 1}}>
        <InputLabel variant="standard" sx={{color: "#000",}} >
          Пароль
        </InputLabel>
        <InputLabel variant="standard"
                    onClick={() => navigate("/recovery")}
                    sx={{textDecoration: "underline",
                      color: "#00F",
                      ":hover": {cursor: "pointer"}}}>
          Забыли пароль?
        </InputLabel>
      </Stack>

      <TextField
        id="password"
        type="password"
        placeholder="Введите пароль"
        variant="outlined"
        fullWidth
        required
      />

      <Stack direction="row" justifyContent="space-between" sx={{marginTop: 1}}>
        <Typography variant="body1">
          Еще нет аккаунта Markeasy?
        </Typography>
        <Typography variant="body1"
                    onClick={() => setPage("register")}
                    sx={{textDecoration: "underline",
                      color: "#00F",
                      ":hover": {cursor: "pointer"}}}>
          Создать аккаунт
        </Typography>
      </Stack>

      <Button variant="contained" color="primary" sx={{marginTop: 1}} fullWidth>
        Войти
      </Button>

    </form>
  )
}

export default SignIn;