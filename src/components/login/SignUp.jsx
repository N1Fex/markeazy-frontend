import {Button, InputLabel, TextField, Typography} from "@mui/material";
import React from "react";
import {EMAIL_REGEX, validatePasswords} from "./LoginUtils";
import ErrorMessage from "../common/ErrorMessage";
import {backToPreviousUrl, postToUrl} from "../axios_config";
import {getLocalCart} from "../cart/CartManager";

const SignUp = ({identifier, setIdentifier, setPage, accountType}) => {
  const [inputValues, setInputValues] = React.useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errorsMessages, setErrorsMessages] = React.useState({
    identifier: "",
    name: "",
  });
  const [passwordErrors, setPasswordErrors] = React.useState([]);

  const isSeller = accountType === "SELLER";
  const identifierLabel = isSeller ? "Логин" : "Email";
  const identifierPlaceholder = isSeller ? "Введите логин" : "Введите почту";
  const nameLabel = isSeller ? "Название магазина" : "Имя";
  const namePlaceholder = isSeller ? "Введите название магазина" : "Введите ваше имя";
  const registerPath = isSeller ? "/register/seller" : "/register";

  const validateInputs = () => {
    const newObjectState = {name: "", identifier: ""};
    let result = true;

    if (isSeller) {
      if (identifier.trim().length < 3) {
        newObjectState.identifier = "Минимальная длина логина 3 символа";
        result = false;
      }
    } else if (!String(identifier).match(EMAIL_REGEX)) {
      newObjectState.identifier = "Неверный формат почты";
      result = false;
    }

    if (inputValues.name.trim().length < 3) {
      newObjectState.name = isSeller
          ? "Минимальная длина названия магазина 3 символа"
          : "Минимальная длина имени 3 символа";
      result = false;
    }

    if (!isSeller && inputValues.name.search("[0-9]") !== -1) {
      newObjectState.name = "Имя не может содержать цифры";
      result = false;
    }

    const errors = validatePasswords(inputValues.password, inputValues.confirmPassword);
    setPasswordErrors([...errors]);

    result = errors.length === 0 && result;
    setErrorsMessages(newObjectState);
    return result;
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === "identifier") {
      setIdentifier(e.target.value);
      setErrorsMessages((prevState) => ({...prevState, identifier: ""}));
      return;
    }

    setInputValues({...inputValues, [e.target.id]: e.target.value});
    if (e.target.id === "name") {
      setErrorsMessages((prevState) => ({...prevState, name: ""}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const payload = {
      name: inputValues.name.trim(),
      password: inputValues.password,
      confirmPassword: inputValues.confirmPassword,
    };

    if (isSeller) {
      payload.login = identifier.trim();
    } else {
      payload.email = identifier.trim();
      payload.cartProducts = getLocalCart().map((cart) => ({
        quantity: cart.amount,
        product: {
          id: cart.id,
        },
      }));
    }

    postToUrl(registerPath, payload)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;

          localStorage.setItem("token", token);
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
          }

          backToPreviousUrl();
        }).catch((err) => {
          if (err.response && err.response.data) {
            setPasswordErrors(err.response.data.message);
          } else {
            setPasswordErrors("Что-то пошло не так, попробуйте еще раз позже");
          }
        });
  };

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
            helperText={errorsMessages.identifier}
            error={errorsMessages.identifier.length !== 0}
        />

        <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
          {nameLabel}
        </InputLabel>
        <TextField
            id="name"
            type="text"
            placeholder={namePlaceholder}
            variant="outlined"
            fullWidth
            required
            helperText={errorsMessages.name}
            onChange={handleChange}
            error={errorsMessages.name.length !== 0}
            value={inputValues.name}
        />

        <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
          Пароль
        </InputLabel>
        <TextField
            id="password"
            type="password"
            placeholder="Введите пароль"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={inputValues.password}
        />

        <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}}>
          Повторный пароль
        </InputLabel>
        <TextField
            id="confirmPassword"
            type="password"
            placeholder="Введите пароль повторно"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={inputValues.confirmPassword}
        />

        <Typography
            variant="body1"
            onClick={() => setPage("login")}
            sx={{
              marginTop: 1,
              textDecoration: "underline",
              color: "#00F",
              ":hover": {cursor: "pointer"},
            }}
        >
          У меня уже есть аккаунт.
        </Typography>

        <ErrorMessage messages={passwordErrors} />

        <Button variant="contained" color="primary" sx={{marginTop: 2}} type="submit" fullWidth>
          Создать аккаунт
        </Button>
      </form>
  );
};

export default SignUp;
