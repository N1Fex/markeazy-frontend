import React from 'react';
import {Container, Stack, Typography} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


const LoginPage = () => {

  const [page, setPage] = React.useState("login");
  const [email, setEmail] = React.useState("");

  return (
    <Container sx={{border: "solid 3px black",
                    borderRadius: "8px",
                    width: {sm: 450, xs: "min(400px, 95%)"},
                    marginY: 4,
              }}>
      <Stack direction="column" justifyContent="space-around" sx={{paddingTop: 2, paddingBottom: 2, width: '100%'}}>
        <Typography variant="h5" align="center">
          {page === "login" && "Вход"}
          {page === "register" && "Регистрация"}
        </Typography>
        {page === "login" && <SignIn setPage={setPage} email={email} setEmail={setEmail} />}
        {page === "register" && <SignUp setPage={setPage} email={email} setEmail={setEmail}/>}
      </Stack>
    </Container>
  );
};

export default LoginPage;