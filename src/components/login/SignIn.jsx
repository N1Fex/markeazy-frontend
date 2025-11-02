import {Button, InputLabel, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {backToPreviousUrl, postToUrl} from "../axios_config";
import ErrorMessage from "../common/ErrorMessage";
import {isUserValid} from "../utils/JwtUtils";
import {EMAIL_REGEX} from "./LoginUtils";


const SignIn = ({email, setEmail, setPage}) => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputErrors, setInputErrors] = useState({
    emailError: false,
    emailMessage: "",

    passwordError: false,
    passwordMessage: "",
  });

  const [entered, setEntered] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "email") {
        e.target.classList.remove("error-field");
        setEmail(e.target.value);
    } else if (e.target.id === "password") {
        e.target.classList.remove("error-field");
        setPassword(e.target.value);
    }
  }

  const validateInputs = (e) => {
    const form = e.target.form;
    const emailField = form.querySelector("#email");

    let result = true;

    if (!String(email).match(EMAIL_REGEX)) {
      inputErrors.emailError = true;
      inputErrors.emailMessage = "Неверный формат почты";
      emailField.focus();
      result = false;
    }

    if (password.length === 0) {
      inputErrors.passwordError = true;
      inputErrors.passwordMessage = "Пароль не может быть пустым";
      result = false;
    }
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs(e)) {
      return;
    }

    setErrorMessages([])
    setInputErrors({});
    postToUrl("/auth", {"email": email, "password": password}, {})
        .then(res => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            setEmail("");
            setPassword("");
            setEntered(true);
            backToPreviousUrl();
        })
        .catch(err => {
            setErrorMessages([err.response.data.message]);
        });
  }

  useEffect(() => {
    if (isUserValid() && !entered) {
      navigate("/settings");
    }

  })

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
          error={inputErrors.emailError}
          helperText={inputErrors.emailMessage}
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
          value={password}
          onChange={handleChange}
          fullWidth
          required
          error={inputErrors.passwordError}
          helperText={inputErrors.passwordMessage}
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
        {errorMessages.length !== 0 ? <ErrorMessage messages={errorMessages} /> : ""}
        <Button variant="contained" color="primary" sx={{marginTop: 1}} fullWidth
                onClick={handleSubmit}>
          Войти
        </Button>

      </form>
  )
}

export default SignIn;