import React from 'react';
import {AppBar, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchBar from "./SearchBar";
import Logotype from "../Logotype";
import BrandName from "../BrandName";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MainMenuContent from "../../main/MainMenuContent";
import {useAuthState} from "../../utils/JwtUtils";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const navigate = useNavigate();
  const {isAuthorized, isSeller} = useAuthState();
  const profileButtonRef = React.useRef(null);

  const [openedMainMenu, setOpenedMainMenu] = React.useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);

  const handleMenu = () => {
    setOpenedMainMenu(true);
  };

  const handleProfile = () => {
    if (isAuthorized) {
      setAccountMenuAnchor(profileButtonRef.current);
    } else {
      navigate("/login");
    }
  };

  return (
      <>
        <AppBar sx={{position: "static", bgcolor: "#F8F8F8"}}>
          <Toolbar disableGutters sx={{margin: "0 2%"}}>
            <Stack direction="row" justifyContent="space-between"
                   alignItems="center" width="100%" height={60}>
              <IconButton sx={{display: {md: "none", sm: "inherit"}}} onClick={handleMenu} aria-label="menu">
                <MenuIcon sx={{fontSize: 30}}/>
              </IconButton>
              <Stack direction="row" alignItems="center" spacing={2}
                     sx={{height: "100%", width: "auto", margin: 0, padding: 0.3,
                       display: {sm: "flex", xs: "none"}}}>
                <Logotype type={"logoNoText"} />
                <BrandName fontSize={24} fontColor={"primary"} sx={{display: {md: "block", xs: "none"}}}/>
              </Stack>

              <SearchBar />

              <Stack direction="row" spacing={{md: 2, xs: 0}} alignItems="center">
                <Button
                    sx={{
                      paddingY: {md: 0, xs: 1},
                      textTransform: "none",
                      minWidth: "max-content",
                      borderRadius: {md: "inherit", xs: "50%"},
                    }}
                    onClick={() => navigate(isSeller ? "/myproducts" : "/cart")}
                >
                  <Stack direction="column" spacing={-0.6} alignItems="center">
                    {isSeller ? (
                        <StorefrontOutlinedIcon sx={{fontSize: {xs: 30, md: 24}}}/>
                    ) : (
                        <ShoppingCartOutlinedIcon sx={{fontSize: {xs: 30, md: 24}}}/>
                    )}
                    <Typography variant="body1" sx={{display: {md: "inherit", xs: "none"}}}>
                      {isSeller ? "Мои товары" : "Корзина"}
                    </Typography>
                  </Stack>
                </Button>

                <Button
                    ref={profileButtonRef}
                    sx={{
                      color: "#808080",
                      paddingY: {md: 0, xs: 1},
                      textTransform: "none",
                      minWidth: "max-content",
                      borderRadius: {md: "inherit", xs: "50%"},
                    }}
                    onClick={handleProfile}
                >
                  <Stack direction="column" spacing={-0.6} alignItems="center">
                    <AccountCircleOutlinedIcon sx={{fontSize: {xs: 30, md: 24}, height: "auto"}}/>
                    <Typography
                        variant="body1"
                        sx={{display: {md: "inherit", xs: "none"}}}
                        aria-controls={Boolean(accountMenuAnchor) && isAuthorized ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(accountMenuAnchor) && isAuthorized ? "true" : undefined}
                    >
                      {isAuthorized ? "Профиль" : "Войти"}
                    </Typography>
                  </Stack>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{display: "none", height: 38}}
                >
                  Войти
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
          <MainMenuContent opened={openedMainMenu} setOpened={setOpenedMainMenu} />
          <AccountMenu anchorEl={accountMenuAnchor} setAnchorEl={setAccountMenuAnchor}/>
        </AppBar>
      </>
  );
};

export default Header;
