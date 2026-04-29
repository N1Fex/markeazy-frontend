import React from 'react';
import {Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FormContainer from "./FormContainer";

const LoginPage = () => {
  const [page, setPage] = React.useState("login");
  const [accountType, setAccountType] = React.useState("USER");
  const [identifier, setIdentifier] = React.useState("");

  const handleAccountTypeChange = (event, value) => {
    if (!value) {
      return;
    }

    setAccountType(value);
    setIdentifier("");
  };

  return (
      <FormContainer>
        <Stack direction="column" justifyContent="space-around" sx={{paddingTop: 2, paddingBottom: 2, width: '100%'}}>
          <Typography variant="h5" align="center">
            {page === "login" && "Вход"}
            {page === "register" && "Регистрация"}
          </Typography>

          <ToggleButtonGroup
              color="primary"
              exclusive
              value={accountType}
              onChange={handleAccountTypeChange}
              fullWidth
              sx={{marginTop: 2}}
          >
            <ToggleButton value="USER">Покупатель</ToggleButton>
            <ToggleButton value="SELLER">Продавец</ToggleButton>
          </ToggleButtonGroup>

          {page === "login" && (
              <SignIn
                  setPage={setPage}
                  identifier={identifier}
                  setIdentifier={setIdentifier}
                  accountType={accountType}
              />
          )}
          {page === "register" && (
              <SignUp
                  setPage={setPage}
                  identifier={identifier}
                  setIdentifier={setIdentifier}
                  accountType={accountType}
              />
          )}
        </Stack>
      </FormContainer>
  );
};

export default LoginPage;
