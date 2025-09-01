import {Button, InputLabel, TextField, Typography} from "@mui/material";
import React from "react";

const SignUp = ({email, setEmail,setPage}) => {

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

      <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}} >
        Имя
      </InputLabel>
      <TextField
        id="name"
        type="text"
        placeholder="Введите ваше имя"
        variant="outlined"
        fullWidth
        required
      />

      <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}} >
        Пароль
      </InputLabel>
      <TextField
        id="password"
        type="password"
        placeholder="Введите пароль"
        variant="outlined"
        fullWidth
        required
      />
      <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}} >
        Повторный пароль
      </InputLabel>
      <TextField
        id="passwordRepeat"
        type="password"
        placeholder="Введите пароль повторно"
        variant="outlined"
        fullWidth
        required
      />
      <Typography variant="body1"
                  onClick={() => setPage("login")}
                  sx={{
                    marginTop: 1,
                    textDecoration: "underline",
                    color: "#00F",
                    ":hover": {cursor: "pointer"}}}>
        У меня уже есть аккаунт.
      </Typography>
      <Button variant="contained" color="primary" sx={{marginTop: 2}} fullWidth>
        Создать аккаунт
      </Button>

    </form>
  )
}

export default SignUp;