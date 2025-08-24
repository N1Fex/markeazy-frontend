import React from 'react';
import {Chip, Container, Dialog, Divider, IconButton, Slide, Typography} from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const MainMenuContent = ({opened, setOpened, }) => {

  const handleClose = (e) => {
      setOpened(false);
  }

  return (

    <Dialog
      fullScreen
      open={opened}
      onClose={handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <IconButton sx={{width: "max-content", position: "absolute"}} onClick={handleClose}>
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
      <Typography sx={{fontSize: 18, marginY: 1, textAlign: "center"}}>
        Категории товаров
      </Typography>
      <Divider orientation="horizontal" variant="fullWidth" flexItem />
      <Container>

      </Container>
    </Dialog>

    // <Container>
    //   <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
    //         anchorOrigin={{
    //           vertical: 'bottom',
    //           horizontal: "left",
    //         }}
    //         sx={{maxWidth: '100vw'}}
    //         disableScrollLock>
    //     <MenuItem onClick={handleClose}>Опция 1</MenuItem>
    //     <MenuItem onClick={handleClose}>Option 2</MenuItem>
    //   </Menu>
    // </Container>
  );
};

export default MainMenuContent;