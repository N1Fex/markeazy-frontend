import React from 'react';
import {Stack, Typography} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FormContainer from "./FormContainer";


const LoginPage = () => {

  const [page, setPage] = React.useState("login");
  const [email, setEmail] = React.useState("");

  return (
    <FormContainer>
      <Stack direction="column" justifyContent="space-around" sx={{paddingTop: 2, paddingBottom: 2, width: '100%'}}>
        <Typography variant="h5" align="center">
          {page === "login" && "Вход"}
          {page === "register" && "Регистрация"}
        </Typography>
        {page === "login" && <SignIn setPage={setPage} email={email} setEmail={setEmail} />}
        {page === "register" && <SignUp setPage={setPage} email={email} setEmail={setEmail}/>}
      </Stack>

    </FormContainer>
  );
};

export default LoginPage;