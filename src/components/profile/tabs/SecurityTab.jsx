import React from 'react';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {patchToUrl} from "../../axios_config";
import {validatePasswords} from "../../login/LoginUtils";
import CheckIcon from "@mui/icons-material/Check";
import ErrorMessage from "../../common/ErrorMessage";


const inputsObj = [
  {
    id: "oldPassword",
    label: "Старый пароль",
  },
  {
    id: "newPassword",
    label: "Новый пароль",
  },
  {
    id: "confirmPassword",
    label: "Повторно новый пароль",
  }
]

const SecurityTab = () => {

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarParams, setSnackbarParams] = React.useState({
    message: "",
    severity: "success"
  });
  const [errorsMessages, setErrorsMessages] = React.useState([]);

  const validateInputs = (oldPassword, newPassword, confPassword) => {

    const errors = validatePasswords(newPassword, confPassword);

    if (oldPassword === newPassword) {
      errors.push("Новый пароль должен отличаться от старого");
    }

    return errors;
  }

  const handleCloseSnackbar = (e, reason) => {
    setOpenSnackbar(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = Array.from(e.currentTarget.form.getElementsByTagName("input"));
    const outputObj = {};

    inputs.forEach(input => {
      outputObj[input.id] = input.value;
    });

    const errors = validateInputs(outputObj["oldPassword"], outputObj["newPassword"], outputObj["confirmPassword"]);
    setErrorsMessages(errors);
    if (errors.length > 0) {
      return;
    }

    setOpenBackdrop(true);
    patchToUrl("/password", outputObj)
        .then((res) => {
          setOpenBackdrop(false);
          setSnackbarParams({
            message: "Пароль успешно изменен!",
            severity: "success",
          });
          setOpenSnackbar(true);
        }).catch((err) => {
          console.log(err);
          const msg = err.status === 401 ? "Вы не авторизированы" : err.response.data.message;
          setOpenBackdrop(false);
          setSnackbarParams({
            message: msg,
            severity: "error",
          });
          setOpenSnackbar(true);
    });
  }

  return (
      <Container>
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                  anchorOrigin={{vertical: "top", horizontal: "center" }}>
          <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarParams.severity}
              variant="filled"
              sx={{ width: '100%' }}
          >
            {snackbarParams.message}
          </Alert>
        </Snackbar>

        <form>
          <Grid container spacing={2} columns={16} justifyContent="space-between" alignItems="center">
            {
              inputsObj.map((obj, i) =>
                <React.Fragment key={i}>
                  <Grid size={6} key={obj.id + "1"}>
                    <Typography>{obj.label}</Typography>
                  </Grid>
                  <Grid size={10} key={obj.id + "2"}>
                    <TextField id={obj.id} type="password" size="small"/>
                  </Grid>
                </React.Fragment>
              )

            }
          </Grid>
          <ErrorMessage messages={errorsMessages} sx={{marginY: 2}}/>
          <Stack direction="row" justifyContent="end">
            <Button variant="contained" color="success" sx={{textTransform: 'none'}}
                    onClick={handleSubmit}>
              <Typography sx={{marginRight: 1}}>Сменить пароль</Typography>
              <CheckIcon fontSize="small"/>
            </Button>
          </Stack>

        </form>
      </Container>
  );
};

export default SecurityTab;