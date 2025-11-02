import {Button, InputLabel, TextField, Typography} from "@mui/material";
import React from "react";
import {EMAIL_REGEX, validatePasswords} from "./LoginUtils";
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";
import ErrorMessage from "../common/ErrorMessage";
import {backToPreviousUrl, postToUrl} from "../axios_config";
import {getLocalCart} from "../cart/CartManager";

const SignUp = ({email, setEmail, setPage}) => {

  const [inputValues, setInputValues] = React.useState({
    name: "",
    password: "",
    confirmPassword: "",
  })

  const [errorsMessages, setErrorsMessages] = React.useState({
    email: "",
    name: ""
  })

  const [passwordErrors, setPasswordErrors] = React.useState([])

  const validateInputs = (e) => {
    const newObjectState = {name:"", email:""};

    let result = true;

    if (!String(email).match(EMAIL_REGEX)) {
      newObjectState.email = "Неверный формат почты";
      result = false;
    }

    if (inputValues.name.length < 3) {
      newObjectState.name = "Минимальная длина имени 3 символа";
      result = false;
    }

    if (inputValues.name.search("[0-9]") !== -1) {
      newObjectState.name = "Имя не может содержать цифры";
      result = false;

    }

    const errors = validatePasswords(inputValues.password, inputValues.confirmPassword);
    setPasswordErrors([...errors]);

    result = errors.length === 0 && result;

    setErrorsMessages(newObjectState);
    return result;
  }

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setInputValues({...inputValues, [e.target.id]: e.target.value});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs(e)) return;

    postToUrl("/register", {
      email: email,
      name: inputValues.name,
      password: inputValues.password,
      confirmPassword: inputValues.confirmPassword,
      cartProducts: getLocalCart().map((cart) => {
        return {
          quantity: cart.amount,
          product: {
            id: cart.id
          },
        }
      })
    }).then(res => {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      backToPreviousUrl();
    }).catch(err => {
      if (err.response && err.response.data) {
        setPasswordErrors(err.response.data.message);
      } else {
        setPasswordErrors("Что-то пошло не так, попробуйте еще раз позже");
      }
    })
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
        helperText={errorsMessages.email}
        error={errorsMessages.email.length !== 0}
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
        helperText={errorsMessages.name}
        onChange={handleChange}
        error={errorsMessages.name.length !== 0}

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
        onChange={handleChange}

      />
      <InputLabel variant="standard" sx={{color: "#000", marginTop: 1}} >
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
      <ErrorMessage messages={passwordErrors} />
      <Button variant="contained" color="primary" sx={{marginTop: 2}} onClick={handleSubmit} fullWidth>
        Создать аккаунт
      </Button>

    </form>
  )
}

export default SignUp;