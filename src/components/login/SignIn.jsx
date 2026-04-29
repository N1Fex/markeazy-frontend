import {Button, InputLabel, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {backToPreviousUrl, postToUrl} from "../axios_config";
import ErrorMessage from "../common/ErrorMessage";
import {isUserValid} from "../utils/JwtUtils";
import {EMAIL_REGEX} from "./LoginUtils";

const SignIn = ({identifier, setIdentifier, setPage, accountType}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputErrors, setInputErrors] = useState({
    identifierError: false,
    identifierMessage: "",
    passwordError: false,
    passwordMessage: "",
  });
  const [entered, setEntered] = useState(false);

  const isSeller = accountType === "SELLER";
  const identifierLabel = isSeller ? "Логин" : "Email";
  const identifierPlaceholder = isSeller ? "Введите логин" : "Введите почту";

  const handleChange = (e) => {
    const {id, value} = e.target;

    if (id === "identifier") {
      setIdentifier(value);
      setInputErrors((prevState) => ({
        ...prevState,
        identifierError: false,
        identifierMessage: "",
      }));
      return;
    }

    if (id === "password") {
      setPassword(value);
      setInputErrors((prevState) => ({
        ...prevState,
        passwordError: false,
        passwordMessage: "",
      }));
    }
  };

  const validateInputs = () => {
    const nextErrors = {
      identifierError: false,
      identifierMessage: "",
      passwordError: false,
      passwordMessage: "",
    };

    let result = true;

    if (isSeller) {
      if (identifier.trim().length === 0) {
        nextErrors.identifierError = true;
        nextErrors.identifierMessage = "Логин не может быть пустым";
        result = false;
      }
    } else if (!String(identifier).match(EMAIL_REGEX)) {
      nextErrors.identifierError = true;
      nextErrors.identifierMessage = "Неверный формат почты";
      result = false;
    }

    if (password.length === 0) {
      nextErrors.passwordError = true;
      nextErrors.passwordMessage = "Пароль не может быть пустым";
      result = false;
    }

    setInputErrors(nextErrors);
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setErrorMessages([]);

    const payload = isSeller
        ? {login: identifier.trim(), password}
        : {email: identifier.trim(), password};

    postToUrl("/auth", payload, {})
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setIdentifier("");
          setPassword("");
          setEntered(true);
          backToPreviousUrl();
        })
        .catch((err) => {
          setErrorMessages([err?.response?.data?.message ?? "Не удалось войти"]);
        });
  };

  useEffect(() => {
    if (isUserValid() && !entered) {
      navigate("/settings");
    }
  }, [entered, navigate]);

  return (
      <form onSubmit={handleSubmit}>
        <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
          {identifierLabel}
        </InputLabel>
        <TextField
            id="identifier"
            type={isSeller ? "text" : "email"}
            placeholder={identifierPlaceholder}
            variant="outlined"
            value={identifier}
            onChange={handleChange}
            fullWidth
            required
            error={inputErrors.identifierError}
            helperText={inputErrors.identifierMessage}
        />

        <Stack direction="row" justifyContent="space-between" sx={{marginTop: 1}}>
          <InputLabel variant="standard" sx={{color: "#000"}}>
            Пароль
          </InputLabel>
          <InputLabel
              variant="standard"
              onClick={() => navigate("/recovery")}
              sx={{
                textDecoration: "underline",
                color: "#00F",
                ":hover": {cursor: "pointer"},
              }}
          >
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
          <Typography
              variant="body1"
              onClick={() => setPage("register")}
              sx={{
                textDecoration: "underline",
                color: "#00F",
                ":hover": {cursor: "pointer"},
              }}
          >
            Создать аккаунт
          </Typography>
        </Stack>

        {errorMessages.length !== 0 ? <ErrorMessage messages={errorMessages} /> : ""}

        <Button variant="contained" color="primary" sx={{marginTop: 1}} fullWidth type="submit">
          Войти
        </Button>
      </form>
  );
};

export default SignIn;
