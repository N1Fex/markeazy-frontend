import React from 'react';
import {AppBar, Button, IconButton, MenuItem, Menu, Stack, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchBar from "./SearchBar";
import Logotype from "../Logotype";
import BrandName from "../BrandName";
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MainMenuContent from "./MainMenuContent";

const Header = () => {

  const navigate = useNavigate();

  const [openedMainMenu, setOpenedMainMenu] = React.useState(false);

  const handleMenu = (event) => {
    setOpenedMainMenu(true);
  };


  return (
    <>
      <AppBar sx={{ position: "static", bgcolor: "#F8F8F8"}}>
          <Toolbar disableGutters sx={{margin: "0 2%"}}>

            <Stack direction="row" justifyContent="space-between"
                   alignItems="center" width="100%" height={60}>
              <IconButton sx={{display: {md: "none", sm: "inherit"}}} onClick={handleMenu} aria-label="menu">
                <MenuIcon sx={{fontSize: 30}}/>
              </IconButton>
              <Stack direction="row" alignItems="center" spacing={2}
                     sx={{height: "100%", width:"auto", margin: 0, padding: 0.3,
                     display: {sm: "flex", xs: "none"}}}>
                <Logotype type={"logoNoText"}/>
                <BrandName fontSize={24} fontColor={"primary"} sx={{display: {md: "block", xs: "none"}}}/>
              </Stack>


              <Button variant="outlined" sx={{textTransform: "none",
                display: {md: "inherit", xs: "none"},
                paddingX: {xs:0, md: 1}, minWidth: 32}} >
                <CategoryIcon />
                <Typography variant="body1" fontSize={18}
                            sx={{color: 'text.primary', marginX: 0.8,
                            display: {lg: "inherit", md: "none"}}}>
                  Категории
                </Typography>
              </Button>

              <SearchBar />



              <Stack direction="row" spacing={3} alignItems="center">
                <Button sx={{paddingY: {md: 0, xs: 1}, textTransform: "none",
                  minWidth: "max-content", borderRadius: {md: "inherit", xs:"50%"}}}>

                  <Stack direction="column" spacing={-0.6} alignItems="center">
                    <ShoppingCartOutlinedIcon sx={{fontSize: {xs: 30, md: 24}}}/>
                    <Typography variant="body1" sx={{display: {md: "inherit", xs:"none"}}}>Корзина</Typography>
                  </Stack>

                </Button>
                <Button variant="contained" color="primary"
                        onClick={() => navigate("/login")}
                        sx={{display: {md: "inherit", xs: "none"}, height: 38}}>
                  Войти
                </Button>
              </Stack>

              <IconButton sx={{display: {md: "none", sm: "inherit"}}}>
                <AccountCircleOutlinedIcon sx={{fontSize: 30, height: "auto"}}/>
              </IconButton>

            </Stack>


          </Toolbar>
        <MainMenuContent opened={openedMainMenu} setOpened={setOpenedMainMenu} />
      </AppBar>
    </>
  );
};

export default Header;