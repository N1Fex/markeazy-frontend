import React from 'react';
import {Alert, Backdrop, Button, CircularProgress, Container, Grid, Snackbar, Stack, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import {convertDateToString} from "../../utils/DateUtils";
import {patchToUrl} from "../../axios_config";
import GridRow from "./GridRow";

const PersonalTab = ({user}) => {

  const [editing, setEditing] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarParams, setSnackbarParams] = React.useState({
    message: "",
    severity: "success"
  });

  const [userData, setUserData] = React.useState(user);

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  }

  const handleCloseSnackbar = (e, reason) => {
    setOpenSnackbar(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = Array.from(e.currentTarget.form.getElementsByTagName("input"));
    const outputObj = {};
    inputs.forEach((input) => {
      if (input.value !== userData[input.id]) {
        outputObj[input.id] = input.value;
      }
    })
    if (Object.keys(outputObj).length === 0) {
      setEditing(false);
      return;
    }
    setOpenBackdrop(true);
    patchToUrl("/profile", outputObj)
        .then((res) => {
          setOpenBackdrop(false);
          setEditing(false);
          setSnackbarParams({
            message: "Данные успешно изменены!",
            severity: "success",
          });
          setOpenSnackbar(true);
        }).catch((err) => {
          setOpenBackdrop(false);
          setSnackbarParams({
            message: "Что-то пошло не так, попробуйте позже!",
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
            <GridRow id={"id"} label={"Идентификатор"} value={userData.id} editable={false} editing={editing} />
            <GridRow id={"registrationDate"} label={"Дата регистрации"} value={convertDateToString(new Date(userData.registrationDate))} editable={false} editing={editing} />
            <GridRow id={"name"} label={"Имя"} value={userData.name} editable={true} editing={editing} />
            <GridRow id={"email"} label={"Эл.почта"} value={userData.email} editable={false} editing={editing} />
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="end">
            <Button variant="outlined" color="secondary" sx={{textTransform: 'none', display: !editing ? 'inherit' : 'none'}}
                    onClick={() => setEditing(true)}>
              <Typography sx={{marginRight: 1}}>Редактировать</Typography>
              <EditIcon fontSize="small"/>
            </Button>

            <Button variant="outlined" color="error" sx={{textTransform: 'none', display: editing ? 'inherit' : 'none'}}
                    onClick={handleCancel}>
              <Typography sx={{marginRight: 1}}>Отмена</Typography>
              <CloseIcon fontSize="small"/>
            </Button>
            <Button variant="contained" color="success" sx={{textTransform: 'none', display: editing ? 'inherit' : 'none'}}
                    onClick={handleSubmit}>
              <Typography sx={{marginRight: 1}}>Применить</Typography>
              <CheckIcon fontSize="small"/>
            </Button>

          </Stack>
        </form>
      </Container>
  );
};

export default PersonalTab;